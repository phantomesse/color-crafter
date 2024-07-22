import { Color } from '../models/color';
import { HexColor } from '../models/hex-color';
import { HslSpace } from '../models/hsl-color';
import { getColor, getContrastRatio, isWhite } from './color-utils';

export type ManipulationFn = (
  color: Color,
  amountOrConfig: number | ManipulationConfig
) => Color;

export type ManipulationConfig = {
  /**
   * Change the value by a discrete amount [0, 100].
   *
   * Only one of amount, percent, and contrast can be set at a time.
   *
   * e.g. lighten hsl(328, 50, 50) by amount of 20 --> hsl(328, 50, 70)
   */
  amount?: number;

  /**
   * Change the value by a percent of the current amount [0, 1].
   *
   * Only one of amount, percent, and contrast can be set at a time.
   *
   * e.g. lighten hsl(328, 50, 50) by percent of .2 --> hsl(328, 50, 60)
   *      where 60 = .2 * 50 + 50
   */
  percent?: number;

  /**
   * Change the value until a certain contrast ratio is reached.
   *
   * Only one of amount, percent, and contrast can be set at a time.
   *
   * Note that it is not guaranteed that the contrast ratio is reached if there
   * is no color created by the manipulation that can achieve the contrast
   * ratio.
   */
  contrastRatio?: number;
};

export type Direction = 'increase' | 'decrease';

function _validateManipulationConfig(
  config: ManipulationConfig
): asserts config is ManipulationConfig {
  if (
    [config.amount, config.percent, config.contrastRatio].filter(value => value)
      .length > 1
  ) {
    throw 'Only one of amount, percent, or contrastRatio can be set.';
  }

  if (!(config.amount || config.percent || config.contrastRatio)) {
    throw 'At least one of amount, percent, or contrastRatio must be set.';
  }

  if (config.amount < 0 || config.amount > 100) {
    throw 'Amount must be a number between [0, 100].';
  }

  if (config.percent < 0 || config.percent > 1) {
    throw 'Percent must be a decimal between [0, 1].';
  }
}

function _manipulateHsl(
  color: Color,
  amountOrConfig: number | ManipulationConfig,
  direction: Direction,
  hslSpace: HslSpace
): Color {
  // Manipulate by amount.
  if (typeof amountOrConfig === 'number') {
    return _manipulateHslByAmount(color, amountOrConfig, direction, hslSpace);
  }

  // Use ManipulationConfig.
  _validateManipulationConfig(amountOrConfig);

  // Manipulate by amount.
  if (amountOrConfig.amount) {
    return _manipulateHslByAmount(
      color,
      amountOrConfig.amount,
      direction,
      hslSpace
    );
  }

  // Manipulate by percent.
  if (amountOrConfig.percent) {
    return _manipulateHslByAmount(
      color,
      color.hsl[hslSpace] * amountOrConfig.percent,
      direction,
      hslSpace
    );
  }

  // Manipulate until contrast ratio is reached.
  if (amountOrConfig.contrastRatio) {
    let amount = 1;

    let prevColor: Color;
    while (true) {
      const manipulatedColor = _manipulateHslByAmount(
        color,
        amount,
        direction,
        hslSpace
      );
      if (
        manipulatedColor.hex === prevColor?.hex ||
        getContrastRatio(color, manipulatedColor) >=
          amountOrConfig.contrastRatio
      ) {
        return manipulatedColor;
      }
      prevColor = manipulatedColor;
      amount++;
    }
  }

  throw 'Something went wrong when trying to manipulate HSL!';
}

function _manipulateHslByAmount(
  color: Color,
  amount: number,
  direction: Direction,
  hslSpace: HslSpace
) {
  function getNewValue(): number {
    if (hslSpace === 's' || hslSpace === 'l') {
      return direction === 'increase'
        ? Math.min(color.hsl[hslSpace] + amount, 100)
        : Math.max(color.hsl[hslSpace] - amount, 0);
    }

    // Shift hue.
    return (
      (color.hsl[hslSpace] +
        amount * (direction === 'decrease' ? -1 : 1) +
        360) %
      360
    );
  }

  return getColor(
    Object.fromEntries(
      ['h', 's', 'l'].map(key => {
        if (key !== hslSpace) return [key, color.hsl[key]];
        return [key, getNewValue()];
      })
    )
  );
}

export const getLighterColor = (
  color: Color,
  amountOrConfig: number | ManipulationConfig
) => _manipulateHsl(color, amountOrConfig, 'increase', 'l');

export const getDarkerColor = (
  color: Color,
  amountOrConfig: number | ManipulationConfig
) => _manipulateHsl(color, amountOrConfig, 'decrease', 'l');

export const getMoreSaturatedColor = (
  color: Color,
  amountOrConfig: number | ManipulationConfig
) => _manipulateHsl(color, amountOrConfig, 'increase', 's');

export const getLessSaturatedColor = (
  color: Color,
  amountOrConfig: number | ManipulationConfig
) => _manipulateHsl(color, amountOrConfig, 'decrease', 's');

export function shiftHue(color: Color, amount: number) {
  return _manipulateHsl(
    color,
    Math.abs(amount),
    amount > 0 ? 'increase' : 'decrease',
    'h'
  );
}
