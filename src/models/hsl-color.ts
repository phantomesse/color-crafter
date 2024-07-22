export type HslSpace = 'h' | 's' | 'l';

/** Color represented in HSL. */
export type HslColor = {
  h: number; // Hue between [0, 360]
  s: number; // Saturation between [0, 100]
  l: number; // Lightness between [0, 100]
};
export const DEFAULT_HSL_COLOR = { h: 0, s: 0, l: 0 };

export function isHslColor(value: any): boolean {
  if (typeof value !== 'object' || value === null) return false;

  const obj: Object = value as Object;
  if (!('h' in obj && 's' in obj && 'l' in obj)) return false;

  const hsl: HslColor = obj as HslColor;
  if (hsl.h < 0 || hsl.h > 360) return false;
  if (hsl.s < 0 || hsl.s > 100) return false;
  if (hsl.l < 0 || hsl.l > 100) return false;

  return !Object.values(hsl)
    .map(value => Math.round(value) === value)
    .includes(false);
}

/**
 * Processes a value to conform to our `HslColor` type.
 *
 * @param h hue value [0, 360]
 * @param s saturaton value [0, 100] or [0, 1]
 * @param l lightness value [0, 100] or [0, 1]
 */
export function asHslColor(h: number, s: number, l: number): HslColor {
  // Check if saturation or lightness is a decimal between [0, 1] and convert
  // to [0, 100];
  if (s <= 1 && l <= 1) {
    s *= 100;
    l *= 100;
  }

  // Round to integers.
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  // If any value is invalid, then HSL is invalid.
  if (h < 0 || h > 360) return DEFAULT_HSL_COLOR;
  if (s < 0 || s > 100) return DEFAULT_HSL_COLOR;
  if (l < 0 || l > 100) return DEFAULT_HSL_COLOR;

  return { h, s, l };
}
