import { Color } from './color.mjs';

const _THEME_KEY = 'theme';
const _SEED_COLORS_KEY = 'seed';

/** @param {...string} seedHexColors */
export function updateSeedColors(...seedHexColors) {
  _setUrlParam(
    _SEED_COLORS_KEY,
    seedHexColors.map(hexColor => hexColor.replace('#', '')).join(',')
  );
}

/** @returns {Color[]} */
export function getSeedColors() {
  const params = _getUrlParams();
  if (!(_SEED_COLORS_KEY in params)) return [];

  return params[_SEED_COLORS_KEY]
    .split(',')
    .map(hexColor => new Color('#' + hexColor));
}

/** @param {string} themeName */
export function updateTheme(themeName) {
  _setUrlParam(_THEME_KEY, themeName);
}
export const getThemeName = () => _getUrlParams()[_THEME_KEY];

/**
 * @returns {Object.<string, string>}
 */
function _getUrlParams() {
  return Object.fromEntries(
    window.location.search
      .substring(1)
      .split('&')
      .map(pair => pair.split('='))
  );
}

/**
 * @param {string} key
 * @param {string} value
 */
function _setUrlParam(key, value) {
  const params = _getUrlParams();
  params[key] = value;
  window.location.search = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}
