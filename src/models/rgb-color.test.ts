import { describe, test, expect } from '@jest/globals';
import { asRgbColor, isRgbColor } from './rgb-color';

describe('rgb color', () => {
  test(`${isRgbColor.name}`, () => {
    expect(isRgbColor({})).toBe(false);
    expect(isRgbColor(0)).toBe(false);
    expect(isRgbColor(null)).toBe(false);
    expect(isRgbColor('#e32d8d')).toBe(false);

    expect(
      isRgbColor({
        r: 227,
        g: 46,
        b: 140,
      })
    ).toBe(true);
    expect(
      isRgbColor({
        r: 0,
        g: 0,
        b: 0,
      })
    ).toBe(true);
  });

  test(`${asRgbColor.name}`, () => {
    expect(asRgbColor(0.89, 0.18, 0.55)).toStrictEqual({
      r: 227,
      g: 46,
      b: 140,
    });

    expect(asRgbColor(227, 45, 141)).toStrictEqual({
      r: 227,
      g: 45,
      b: 141,
    });

    expect(asRgbColor(0, 256, 0)).toStrictEqual({ r: 0, g: 0, b: 0 });
    expect(asRgbColor(-1, 0, 0)).toStrictEqual({ r: 0, g: 0, b: 0 });
    expect(asRgbColor(0, 0, 0)).toStrictEqual({ r: 0, g: 0, b: 0 });
  });
});
