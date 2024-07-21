import { describe, test, expect } from '@jest/globals';
import { asRgbColor, RgbColor } from './rgb-color';

describe('rgb color', () => {
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
