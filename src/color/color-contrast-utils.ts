import {
  darkenColor,
  desaturateColor,
  lightenColor,
  saturateColor,
} from './color-manipulation-utils';
import { ColorModel } from './color-model';

export function getContrastingColor(
  color: ColorModel,
  contrastRatio: number
): ColorModel {
  return _getContrastingColor(color, 1, contrastRatio);
}

function _getContrastingColor(
  color: ColorModel,
  amountToChangeLightness: number,
  contrastRatio: number
): ColorModel {
  const lighterColor = lightenColor(color, {
    discrete: amountToChangeLightness,
  });
  if (_hasAcceptableContrast(color, lighterColor, contrastRatio)) {
    return lighterColor;
  }

  const darkerColor = darkenColor(color, {
    discrete: amountToChangeLightness,
  });
  if (_hasAcceptableContrast(color, darkerColor, contrastRatio)) {
    return darkerColor;
  }

  if (lighterColor.hsl.l === 100 && darkerColor.hsl.l === 0) {
    // Last resort when there isn't any availble contrasting colors.
    return _getContrastRatio(color, lighterColor) >
      _getContrastRatio(color, darkerColor)
      ? lighterColor
      : darkerColor;
  }

  for (
    let amountToChangeSaturation = 1;
    amountToChangeSaturation < Math.min(100 - color.hsl.s, color.hsl.s) / 2;
    amountToChangeSaturation++
  ) {
    const colors = [
      saturateColor(lighterColor, { discrete: amountToChangeSaturation }),
      saturateColor(darkerColor, { discrete: amountToChangeSaturation }),
      desaturateColor(lighterColor, { discrete: amountToChangeSaturation }),
      desaturateColor(darkerColor, { discrete: amountToChangeSaturation }),
    ];
    for (const newColor of colors) {
      if (_hasAcceptableContrast(color, newColor, contrastRatio)) {
        return newColor;
      }
    }
  }

  return _getContrastingColor(
    color,
    amountToChangeLightness + 1,
    contrastRatio
  );
}

function _hasAcceptableContrast(
  color1: ColorModel,
  color2: ColorModel,
  contrastRatio: number
): boolean {
  return _getContrastRatio(color1, color2) >= contrastRatio;
}

function _getContrastRatio(color1: ColorModel, color2: ColorModel): number {
  const luminance1 = _getLuminance(color1);
  const luminance2 = _getLuminance(color2);
  return luminance1 > luminance2
    ? (luminance1 + 0.05) / (luminance2 + 0.05)
    : (luminance2 + 0.05) / (luminance1 + 0.05);
}

function _getLuminance(color: ColorModel): number {
  const { r, g, b } = color.rgb;
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
