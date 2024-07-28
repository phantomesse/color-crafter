import { HTML_WEB_COLORS } from './color-names/html-web-colors.mjs';
import { CRAYOLA_COLORS } from './color-names/crayola-colors.mjs';
import { PANTONE_COLORS } from './color-names/pantone-colors.mjs';

/**
 * @typedef ColorNameSource
 */

export const HEX_COLOR_TO_COLOR_NAME_MAP = {
  ...HTML_WEB_COLORS,
  ...CRAYOLA_COLORS,
  ...PANTONE_COLORS,
};

export const COLOR_NAME_TO_HEX_COLOR_MAP = (() => {
  return Object.fromEntries(
    Object.entries(HEX_COLOR_TO_COLOR_NAME_MAP).map(([hexColor, colorName]) => {
      return [colorName, hexColor];
    })
  );
})();

export function getColorNameSource(colorName) {
  if (Object.values(HTML_WEB_COLORS).includes(colorName)) return 'html-web';
  if (Object.values(CRAYOLA_COLORS).includes(colorName)) return 'crayola';
  if (Object.values(PANTONE_COLORS).includes(colorName)) return 'pantone';
}
