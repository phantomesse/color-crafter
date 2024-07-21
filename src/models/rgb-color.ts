/**
 * Color represented in RGB.
 *
 * Each value must be an integer between [0, 255].
 */
export type RgbColor = {
  r: number;
  g: number;
  b: number;
};
export const DEFAULT_RGB_COLOR = { r: 0, g: 0, b: 0 };

/**
 * Processes a value to conform to our `RgbColor` type.
 *
 * @param r red value [0, 255] or [0, 1]
 * @param g green value [0, 255] or [0, 1]
 * @param b blue value [0, 255] or [0, 1]
 */
export function asRgbColor(r: number, g: number, b: number): RgbColor {
  // Check if the format is a decimal between [0, 1] and convert to [0, 255] if
  // so.
  if (r <= 1 && g <= 1 && b <= 1) {
    r *= 255;
    g *= 255;
    b *= 255;
  }

  // Round to integers.
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  // If any value is invalid, then the RGB is invalid.
  if ([r, g, b].map(isValidRgbValue).includes(false)) return DEFAULT_RGB_COLOR;

  return { r, g, b };
}

function isValidRgbValue(value: number) {
  return value >= 0 && value <= 255;
}
