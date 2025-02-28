import { ColorModel } from './color-model';
import { HslColor, HslSpace } from './hsl-color';

export type ManipulationAmount = {
  /**
   * Change the value by a discrete amount
   * [0, 100] for saturation and lightness
   * [0, 360] for hue
   *
   * Only one of discrete or percent can be set at a time.
   *
   * e.g. lighten by 20 for hsl(328, 50, 50) --> hsl(328, 50, 70)
   */
  discrete?: number;

  /**
   * Change the value by a percent of the current amount [0, 1].
   *
   * Only one of discrete or percent can be set at a time.
   *
   * e.g. light by 20% (0.2) for  hsl(328, 50, 50) --> hsl(328, 50, 60)
   *      where 60 = .2 * 50 + 50
   */
  percent?: number;
};

export function lightenColor(
  color: ColorModel,
  amount: ManipulationAmount
): ColorModel {
  return ColorModel.fromHsl(_manipulateHsl(color.hsl, 'l', amount, 'increase'));
}

export function darkenColor(
  color: ColorModel,
  amount: ManipulationAmount
): ColorModel {
  return ColorModel.fromHsl(_manipulateHsl(color.hsl, 'l', amount, 'decrease'));
}

export function saturateColor(
  color: ColorModel,
  amount: ManipulationAmount
): ColorModel {
  return ColorModel.fromHsl(_manipulateHsl(color.hsl, 's', amount, 'increase'));
}

export function desaturateColor(
  color: ColorModel,
  amount: ManipulationAmount
): ColorModel {
  return ColorModel.fromHsl(_manipulateHsl(color.hsl, 's', amount, 'decrease'));
}

export function generateRandomColor(): ColorModel {
  const random = () => Math.floor(Math.random() * 256);
  return ColorModel.fromRgb({ r: random(), g: random(), b: random() });
}

type _Direction = 'increase' | 'decrease';

function _manipulateHsl(
  hsl: HslColor,
  hslSpace: HslSpace,
  amount: ManipulationAmount,
  direction: _Direction
): HslColor {
  const newHsl = { ...hsl };

  const discreteAmount = amount.percent
    ? amount.percent * hsl[hslSpace]
    : amount.discrete;

  let newValue =
    hsl[hslSpace] + discreteAmount * (direction === 'decrease' ? -1 : 1);
  if (hslSpace === 'h') {
    newValue = newValue % 360;
  } else {
    newValue = Math.min(Math.max(0, newValue), 100);
  }

  newHsl[hslSpace] = newValue;
  return newHsl;
}
