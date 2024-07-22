import {
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
} from './converters';
import {
  asHexColor,
  BLACK_HEX_COLOR,
  HexColor,
  isHexColor,
  WHITE_HEX_COLOR,
} from '../models/hex-color';
import { asHslColor, HslColor, isHslColor } from '../models/hsl-color';
import { asRgbColor, isRgbColor, RgbColor } from '../models/rgb-color';
import { Color, DEFAULT_COLOR } from '../models/color';

export function getColor(input: any): Color {
  const partialColor = _buildPartialColor(input);

  if (partialColor.hex) {
    const hex = partialColor.hex;
    return { hex: hex, rgb: hexToRgb(hex), hsl: hexToHsl(hex) };
  }

  if (partialColor.rgb) {
    const { r, g, b } = partialColor.rgb;
    return {
      hex: rgbToHex(r, g, b),
      rgb: partialColor.rgb,
      hsl: rgbToHsl(r, g, b),
    };
  }

  if (partialColor.hsl) {
    const { h, s, l } = partialColor.hsl;
    let colorToReturn = {
      hex: hslToHex(h, s, l),
      rgb: hslToRgb(h, s, l),
      hsl: partialColor.hsl,
    };
    return colorToReturn;
  }

  return DEFAULT_COLOR;
}

export const isWhite = (color: Color) => color.hex === WHITE_HEX_COLOR;
export const isBlack = (color: Color) => color.hex === BLACK_HEX_COLOR;

export function getContrastRatio(color1: Color, color2: Color): number {
  const luminance1 = _getLuminance(color1);
  const luminance2 = _getLuminance(color2);
  return luminance1 > luminance2
    ? (luminance1 + 0.05) / (luminance2 + 0.05)
    : (luminance2 + 0.05) / (luminance1 + 0.05);
}

function _buildPartialColor(input: any): Color {
  if (isHexColor(input)) {
    return { hex: input as HexColor, rgb: null, hsl: null };
  }

  if (isRgbColor(input)) {
    return { hex: null, rgb: input as RgbColor, hsl: null };
  }

  if (isHslColor(input)) {
    return { hex: null, rgb: null, hsl: input as HslColor };
  }

  if (typeof input === 'string') return _buildPartialColor(asHexColor(input));

  if (typeof input === 'object') {
    if ('h' in input && 's' in input && 'l' in input) {
      return _buildPartialColor(asHslColor(input.h, input.s, input.l));
    }
    if ('r' in input && 'g' in input && 'b' in input) {
      return _buildPartialColor(asRgbColor(input.r, input.g, input.b));
    }
  }

  return DEFAULT_COLOR;
}

function _getLuminance(color: Color): number {
  const { r, g, b } = color.rgb;
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}
