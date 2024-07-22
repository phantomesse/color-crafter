import { Color } from '../models/color';
import { getContrastRatio } from './color-utils';
import {
  getDarkerColor,
  getLessSaturatedColor,
  getLighterColor,
  getMoreSaturatedColor,
} from './manipulation-utils';

export enum ConformanceLevel {
  AA_SMALL_TEXT,
  AA_LARGE_TEXT,
  AAA_SMALL_TEXT,
  AAA_LARGE_TEXT,
}

const _CONFORMANCE_LEVEL_TO_CONTRAST_RATIO_MAP = {
  [ConformanceLevel.AA_SMALL_TEXT]: 4.5,
  [ConformanceLevel.AA_LARGE_TEXT]: 3,
  [ConformanceLevel.AAA_SMALL_TEXT]: 7,
  [ConformanceLevel.AAA_LARGE_TEXT]: 4.5,
};

/**
 * Gets the closest color in the same hue family that is contrasting enough to
 * use with the given color as a text/background combo.
 *
 * @param color to get contrasting color for
 * @returns contrasting color
 */
export function getContrastingColor(
  color: Color,
  conformanceLevel: ConformanceLevel
): Color {
  return _getContrastingColor(color, 1, conformanceLevel);
}

function _getContrastingColor(
  baseColor: Color,
  amountToLightenOrDarken: number,
  conformanceLevel: ConformanceLevel
): Color {
  const lighterColor = getLighterColor(baseColor, amountToLightenOrDarken);
  if (_hasAcceptableContrast(baseColor, lighterColor, conformanceLevel)) {
    return lighterColor;
  }

  const darkerColor = getDarkerColor(baseColor, amountToLightenOrDarken);
  if (_hasAcceptableContrast(baseColor, darkerColor, conformanceLevel)) {
    return darkerColor;
  }

  if (lighterColor.hsl.l === 100 && darkerColor.hsl.l === 0) {
    // Last resort when there isn't any availble contrasting colors.
    return getContrastRatio(baseColor, lighterColor) >
      getContrastRatio(baseColor, darkerColor)
      ? lighterColor
      : darkerColor;
  }

  for (
    let amountToChangeSaturation = 1;
    amountToChangeSaturation <
    Math.min(100 - baseColor.hsl.s, baseColor.hsl.s) / 2;
    amountToChangeSaturation++
  ) {
    const colors = [
      getMoreSaturatedColor(lighterColor, amountToChangeSaturation),
      getMoreSaturatedColor(darkerColor, amountToChangeSaturation),
      getLessSaturatedColor(lighterColor, amountToChangeSaturation),
      getLessSaturatedColor(darkerColor, amountToChangeSaturation),
    ];
    for (const color of colors) {
      if (_hasAcceptableContrast(baseColor, color, conformanceLevel)) {
        return color;
      }
    }
  }

  return _getContrastingColor(
    baseColor,
    amountToLightenOrDarken + 1,
    conformanceLevel
  );
}

function _hasAcceptableContrast(
  color1: Color,
  color2: Color,
  conformanceLevel: ConformanceLevel
): boolean {
  const minContrastRatio =
    _CONFORMANCE_LEVEL_TO_CONTRAST_RATIO_MAP[conformanceLevel];
  return getContrastRatio(color1, color2) >= minContrastRatio;
}
