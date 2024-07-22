import { Color } from '../models/color';
import { asHexColor, HexColor } from '../models/hex-color';
import { asHslColor, HslColor } from '../models/hsl-color';
import { asRgbColor, DEFAULT_RGB_COLOR, RgbColor } from '../models/rgb-color';

export function hexToHsl(inputHex: string): HslColor {
  const rgb = hexToRgb(inputHex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

export function hexToRgb(inputHex: string): RgbColor {
  const parts = asHexColor(inputHex).substring(1).match(/.{2}/g);
  if (parts?.length !== 3) return DEFAULT_RGB_COLOR;

  const rgb = parts.map(hex => parseInt(`0x${hex}`, 16));
  return { r: rgb[0], g: rgb[1], b: rgb[2] };
}

export function hslToHex(
  inputH: number,
  inputS: number,
  inputL: number
): HexColor {
  const rgb = hslToRgb(inputH, inputS, inputL);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

export function hslToRgb(inputH: number, inputS: number, inputL: number) {
  let { h, s, l } = asHslColor(inputH, inputS, inputL);

  // Convert saturation and luminosity.
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let [r, g, b] = [0, 0, 0];

  if (0 <= h && h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (60 <= h && h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (120 <= h && h < 180) {
    [r, g, b] = [0, c, x];
  } else if (180 <= h && h < 240) {
    [r, g, b] = [0, x, c];
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
    [r, g, b] = [x, 0, c];
  } else if (300 <= h && h < 360) {
    [r, g, b] = [c, 0, x];
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
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

export function rgbToHsl(
  inputR: number,
  inputG: number,
  inputB: number
): HslColor {
  let { r, g, b } = asRgbColor(inputR, inputG, inputB);

  // Convert rgb to [0, 1].
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values.
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;

  // Calculate hue.
  let h: number;
  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;

  // Calculate luminosity and saturation.
  let l = (cmax + cmin) / 2;
  let s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Math.round(+(s * 100));
  l = Math.round(+(l * 100));

  return { h, s, l };
}
