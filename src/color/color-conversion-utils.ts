import { HexColor } from './hex-color';
import { HslColor } from './hsl-color';
import { DEFAULT_RGB_COLOR, RgbColor } from './rgb-color';

export function hexToHsl(hex: HexColor): HslColor {
  return rgbToHsl(hexToRgb(hex));
}

export function hexToRgb(hex: HexColor): RgbColor {
  const parts = hex.substring(1).match(/.{2}/g);
  if (parts?.length !== 3) return DEFAULT_RGB_COLOR;

  const rgb = parts.map((part) => parseInt(`0x${part}`, 16));
  return { r: rgb[0], g: rgb[1], b: rgb[2] };
}

export function hslToHex(hsl: HslColor): HexColor {
  return rgbToHex(hslToRgb(hsl));
}

export function hslToRgb(hsl: HslColor) {
  let { h, s, l } = hsl;

  // Convert saturation and lightness.
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

export function rgbToHex(rgb: RgbColor): HexColor {
  const { r, g, b } = rgb;
  return ('#' +
    [r, g, b]
      .map((value) => value.toString(16))
      .map((hex) => (hex.length === 1 ? '0' : '') + hex)
      .join('')) as HexColor;
}

export function rgbToHsl(rgb: RgbColor): HslColor {
  let { r, g, b } = rgb;

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

  // Calculate lightness and saturation.
  let l = (cmax + cmin) / 2;
  let s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = Math.round(+(s * 100));
  l = Math.round(+(l * 100));

  return { h, s, l };
}
