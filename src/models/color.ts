import { DEFAULT_HEX_COLOR, HexColor } from './hex-color';
import { DEFAULT_HSL_COLOR, HslColor } from './hsl-color';
import { DEFAULT_RGB_COLOR, RgbColor } from './rgb-color';

/** Represents a color in hex, RGB, and HSL. */
export type Color = {
  hex: HexColor;
  rgb: RgbColor;
  hsl: HslColor;
};

export const DEFAULT_COLOR = {
  hex: DEFAULT_HEX_COLOR,
  rgb: DEFAULT_RGB_COLOR,
  hsl: DEFAULT_HSL_COLOR,
};
