import { BLACK_HEX_COLOR, HexColor, WHITE_HEX_COLOR } from './models/hex-color';
import { ConformanceLevel, getContrastingColor } from './utils/contrast-utils';
import {
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from './utils/converters';
import { getColor } from './utils/color-utils';
import {
  getDarkerColor,
  getLessSaturatedColor,
  getLighterColor,
  getMoreSaturatedColor,
  ManipulationConfig,
  ManipulationFn,
  shiftHue,
} from './utils/manipulation-utils';

function manipulateColor(
  input: any,
  amountOrConfig: number | ManipulationConfig,
  manipulationFn: ManipulationFn
): HexColor {
  return manipulationFn(getColor(input), amountOrConfig).hex;
}

function isWhite(input: any): boolean {
  return getColor(input).hex === WHITE_HEX_COLOR;
}

function isBlack(input: any): boolean {
  return getColor(input).hex === BLACK_HEX_COLOR;
}

function contrast(
  input: any,
  conformanceLevel: string = 'AA_LARGE_TEXT'
): HexColor {
  return getContrastingColor(
    getColor(input),
    ConformanceLevel[conformanceLevel]
  ).hex;
}

module.exports = {
  // Converter functions.
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  rgbToHex,
  rgbToHsl,

  // Manipulation functions.
  lighten: (input: any, amountOrConfig: number | ManipulationConfig) =>
    manipulateColor(input, amountOrConfig, getLighterColor),
  darken: (input: any, amountOrConfig: number | ManipulationConfig) =>
    manipulateColor(input, amountOrConfig, getDarkerColor),
  saturate: (input: any, amount: number) =>
    manipulateColor(input, amount, getMoreSaturatedColor),
  desaturate: (input: any, amount: number) =>
    manipulateColor(input, amount, getLessSaturatedColor),
  shift: (input: any, amount: number) => shiftHue(getColor(input), amount).hex,

  isWhite,
  isBlack,
  contrast,
};
