import { asHexColor, HexColor } from './models/hex-color';
import { asRgbColor, DEFAULT_RGB_COLOR, RgbColor } from './models/rgb-color';

export function hexToRgb(inputHex: string): RgbColor {
  const parts = asHexColor(inputHex).substring(1).match(/.{2}/g);
  if (parts?.length !== 3) return DEFAULT_RGB_COLOR;

  const rgb = parts.map(hex => parseInt(`0x${hex}`, 16));
  return { r: rgb[0], g: rgb[1], b: rgb[2] };
}

export function rgbToHex(
  inputR: number,
  inputG: number,
  inputB: number
): HexColor {
  const { r, g, b } = asRgbColor(inputR, inputG, inputB);
  return ('#' +
    [r, g, b]
      .map(value => value.toString(16))
      .map(hex => (hex.length === 1 ? '0' : '') + hex)
      .join('')) as HexColor;
}
