import { describe, test, expect } from '@jest/globals';
import { asHslColor, isHslColor } from './hsl-color';

describe('hsl color', () => {
  test(`${isHslColor.name}`, () => {
    expect(isHslColor({})).toBe(false);
    expect(isHslColor(0)).toBe(false);
    expect(isHslColor(null)).toBe(false);
    expect(isHslColor('#e32d8d')).toBe(false);
    expect(isHslColor({ h: 328, s: 0.76, l: 0.53 })).toBe(false);

    expect(isHslColor({ h: 328, s: 76, l: 53 })).toBe(true);
    expect(isHslColor({ h: 0, s: 0, l: 0 })).toBe(true);
  });

  test(`${asHslColor}`, () => {
    expect(asHslColor(328, 0.76, 0.53)).toStrictEqual({ h: 328, s: 76, l: 53 });
    expect(asHslColor(328, 76, 53)).toStrictEqual({ h: 328, s: 76, l: 53 });

    expect(asHslColor(0, 0, -1)).toStrictEqual({ h: 0, s: 0, l: 0 });
    expect(asHslColor(0, -1, 0)).toStrictEqual({ h: 0, s: 0, l: 0 });
    expect(asHslColor(361, 0, 0)).toStrictEqual({ h: 0, s: 0, l: 0 });
    expect(asHslColor(-1, 0, 0)).toStrictEqual({ h: 0, s: 0, l: 0 });
    expect(asHslColor(0, 0, 0)).toStrictEqual({ h: 0, s: 0, l: 0 });
  });
});
