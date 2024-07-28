import { HTML_WEB_COLORS } from './data/html-web-colors.mjs';
import { CRAYOLA_COLORS } from './data/crayola-colors.mjs';
import { PANTONE_COLORS } from './data/pantone-colors.mjs';

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
