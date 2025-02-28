export type HexColor = `#${string}`;

export const DEFAULT_HEX_COLOR = '#000000' as HexColor;

/**
 * Processes a value to conform to our `HexColor` type.
 *
 * @param value a string that can be a valid hex color
 * @returns a valid HexColor or #000000 if the `value` input is invalid
 */
export function asHexColor(value: string): HexColor {
  // Make lowercase, temporarily remove '#', and trim down to 6 characters.
  value = value.toLowerCase().replace('#', '').substring(0, 6);

  // Any value that is less than 3 characters is invalid.
  if (value.length < 3) return DEFAULT_HEX_COLOR;

  // Any value that contains characters other than a-f and 0-9 is invalid.
  if ((value.match(/[a-f0-9]+/g)?.length ?? 0) !== 1) return DEFAULT_HEX_COLOR;

  if (value.length < 6) {
    // Trim down to 3 characters if string is less than 6 characters and expand to
    // 6 characters by doubling each character.
    //
    // e.g. "f7ca" -> "f7c" -> "ff77cc"
    value = value
      .substring(0, 3)
      .split('')
      .map(character => `${character}${character}`)
      .join('');
  }

  return `#${value}`;
}
