import {
  COLOR_NAME_TO_HEX_COLOR_MAP,
  HEX_COLOR_TO_COLOR_NAME_MAP,
} from './color-names.mjs';

export class Color {
  /**
   * @param {string} hex
   * @param {string} [name] color name (e.g. "Black", "White", "Hot Pink")
   */
  constructor(hex, name) {
    this.hex = hex;
    this.rgb = colorCrafter.hexToRgb(hex);
    this.hsl = colorCrafter.hexToHsl(hex);

    this.name = name ?? _getColorName(this);
  }
}

/**
 * Generates a random color and picks the similar named color if that exists.
 *
 * @returns {Color}
 */
export function generateRandomColor() {
  const rgbColor = Array(3)
    .fill(0)
    .map(() => Math.floor(Math.random() * 255));
  const color = new Color(colorCrafter.rgbToHex(...rgbColor));
  if (color.name && COLOR_NAME_TO_HEX_COLOR_MAP[color.name] !== color.hex) {
    return new Color(COLOR_NAME_TO_HEX_COLOR_MAP[color.name]);
  }
  return color;
}

/**
 * @param {Color} color
 * @returns {string|null} name of the color
 */
function _getColorName(color) {
  // Get colors with similar hues.
  const lowestAcceptableHue = color.hsl.h - 10;
  const highestAcceptableHue = color.hsl.h + 10;

  let startIndex = _HUE_TO_START_INDEX_MAP[lowestAcceptableHue];
  let endIndex = _HUE_TO_START_INDEX_MAP[highestAcceptableHue];
  const similarColor = _NAMED_COLORS_SORTED_BY_HUE
    .slice(startIndex, endIndex)
    .sort(
      (namedColor1, namedColor2) =>
        _getRgbDistance(namedColor1, color) -
        _getRgbDistance(namedColor2, color)
    )[0];
  if (!similarColor) return null;
  return _getRgbDistance(similarColor, color) < 40 ? similarColor.name : null;
}

/**
 * @param {Color} color1
 * @param {Color} color2
 * @returns {number} distance between the two colors
 */
function _getRgbDistance(color1, color2) {
  return Math.sqrt(
    Math.pow(Math.abs(color1.rgb.r - color2.rgb.r), 2) +
      Math.pow(Math.abs(color1.rgb.g - color2.rgb.g), 2) +
      Math.pow(Math.abs(color1.rgb.b - color2.rgb.b), 2)
  );
}

/** All named colors sorted by hue from 0 to 360. */
const _NAMED_COLORS_SORTED_BY_HUE = Object.entries(HEX_COLOR_TO_COLOR_NAME_MAP)
  .map(([hexColor, colorName]) => new Color(hexColor, colorName))
  .sort((color1, color2) => color1.hsl.h - color2.hsl.h);

/**
 * Map of a hue in HSL and index where it starts in
 * `_NAMED_COLORS_SORTED_BY_HUE`.
 */
const _HUE_TO_START_INDEX_MAP = (() => {
  const hueToStartIndexMap = {};

  let lastSetHue = 0;
  for (let i = 0; i < _NAMED_COLORS_SORTED_BY_HUE.length; i++) {
    const hue = _NAMED_COLORS_SORTED_BY_HUE[i].hsl.h;
    if (hue in hueToStartIndexMap) continue;
    hueToStartIndexMap[hue] = i;

    // Fill the rest of the hues from last hue.
    for (let h = lastSetHue; h < hue; h++) {
      hueToStartIndexMap[h] = hueToStartIndexMap[lastSetHue];
    }

    lastSetHue = hue;
  }

  // Fill the rest of the numbers between 0 and 360.
  for (let hue = lastSetHue; hue <= 360; hue++) {
    hueToStartIndexMap[hue] = hueToStartIndexMap[lastSetHue];
  }

  return hueToStartIndexMap;
})();
