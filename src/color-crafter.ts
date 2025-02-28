import { getContrastingColor as _getContrastingColor } from './color/color-contrast-utils';
import {
  lightenColor as _lightenColor,
  darkenColor as _darkenColor,
  saturateColor as _saturateColor,
  desaturateColor as _desaturateColor,
  generateRandomColor as _generateRandomColor,
} from './color/color-manipulation-utils';
import { ColorModel as _ColorModel } from './color/color-model';
import { MonochromaticScheme } from './scheme/monochromatic-scheme';
import { RandomScheme } from './scheme/random-scheme';

export const ColorModel = _ColorModel;
export const Schemes = {
  RANDOM: new RandomScheme(),
  MONOCHROMATIC: new MonochromaticScheme(),
};

export const lightenColor = _lightenColor;
export const darkenColor = _darkenColor;
export const saturateColor = _saturateColor;
export const desaturateColor = _desaturateColor;

export const generateRandomColor = _generateRandomColor;

export const ContrastConformanceLevel = {
  AA_SMALL_TEXT: 4.5,
  AA_LARGE_TEXT: 3,
  AAA_SMALL_TEXT: 7,
  AAA_LARGE_TEXT: 4.5,
};
export const getContrastingColor = _getContrastingColor;
