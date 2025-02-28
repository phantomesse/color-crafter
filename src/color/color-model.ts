import {
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from './color-conversion-utils';
import { HexColor } from './hex-color';
import { HslColor } from './hsl-color';
import { RgbColor } from './rgb-color';

export class ColorModel {
  hex: HexColor;
  hsl: HslColor;
  rgb: RgbColor;

  constructor(hex: HexColor, hsl: HslColor, rgb: RgbColor) {
    this.hex = hex;
    this.hsl = hsl;
    this.rgb = rgb;
  }

  static fromHex(hex: HexColor) {
    return new ColorModel(hex, hexToHsl(hex), hexToRgb(hex));
  }

  static fromHsl(hsl: HslColor) {
    return new ColorModel(hslToHex(hsl), hsl, hslToRgb(hsl));
  }

  static fromRgb(rgb: RgbColor) {
    return new ColorModel(rgbToHex(rgb), rgbToHsl(rgb), rgb);
  }
}
