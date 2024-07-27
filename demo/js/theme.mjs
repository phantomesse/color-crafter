import { ColorCard, createColorCard } from './color-card.mjs';
import { Color, generateRandomColor } from './color.mjs';

/**
 * @callback GenerateColorCardsFn
 * @param {...Color} seedColors colors to generate the theme around
 * @returns {ColorCard[]} color cards generated by the theme
 */

/**
 * @typedef Theme
 * @property {string} name name of the theme (e.g. "analagous")
 * @property {GenerateColorCardsFn} generateColorCards
 *           function for generating color cards for the theme
 */

/**
 * Generates a theme with random colors.
 *
 * @param {Color[]} seedColors
 * @param {number} colorCount number of colors to return
 * @returns {Theme}
 */
function _randomTheme(colorCount) {
  return {
    name: `random-${colorCount}`,
    generateColorCards: (...seedColors) => {
      const colorCards = seedColors
        .slice(0, colorCount)
        .map(color => createColorCard(color.hex, 'Seed Color'));
      if (colorCards.length > 0) {
        colorCards[0].setEditable(`random-${colorCount}`);
      }

      while (colorCards.length < colorCount) {
        const colorCard = createColorCard(
          generateRandomColor().hex,
          'Random Color'
        );
        colorCards.push(colorCard);
      }

      return colorCards;
    },
  };
}

/** @type {Theme[]} */
export const THEMES = [
  _randomTheme(3),
  _randomTheme(5),
  _randomTheme(9),
  _randomTheme(16),
];

/**
 * @param {string} themeName
 * @returns {Theme}
 */
export function getTheme(themeName) {
  return THEMES.find(theme => theme.name === themeName);
}
