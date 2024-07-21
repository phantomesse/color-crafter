import { describe, test, expect } from '@jest/globals';
import { hexToRgb, rgbToHex } from './color-crafter';

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
});
