import { describe, test, expect } from '@jest/globals';
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from './converters';

describe('color crafter', () => {
  test(`${hexToRgb.name}`, () => {
    expect(hexToRgb('#e32d8d')).toStrictEqual({
      r: 227,
      g: 45,
      b: 141,
    });

    expect(hexToRgb('F7C')).toStrictEqual({
      r: 255,
      g: 119,
      b: 204,
    });
  });

  test(`${rgbToHex.name}`, () => {
    expect(rgbToHex(227, 45, 141)).toBe('#e32d8d');
    expect(rgbToHex(1, 0.46, 0.8)).toBe('#ff75cc');
  });

  test(`${rgbToHsl.name}`, () => {
    expect(rgbToHsl(227, 45, 141)).toStrictEqual({ h: 328, s: 76, l: 53 });
    expect(rgbToHsl(1, 0.46, 0.8)).toStrictEqual({ h: 322, s: 100, l: 73 });
  });

  test(`${hslToRgb.name}`, () => {
    expect(hslToRgb(328, 76, 53)).toStrictEqual({ r: 226, g: 44, b: 141 });
    expect(hslToRgb(322, 1, 0.73)).toStrictEqual({ r: 255, g: 117, b: 205 });
    expect(hslToRgb(116, 1, 35)).toStrictEqual({ r: 88, g: 90, b: 88 });
  });
});
