/**
 * @returns {Object<string, string>} url params
 */
export function getParams() {
  return Object.fromEntries(
    window.location.search
      .replace('?', '')
      .split('&')
      .map((param) => param.split('='))
  );
}

/**
 * @param {string} key
 * @returns {string|undefined}
 */
export function getParamValue(key) {
  return getParams()[key] ?? undefined;
}

/**
 * @param {string} key
 * @param {string} value
 */
export function setParamValue(key, value) {
  const params = getParams();
  params[key] = value;
  window.location.search = Object.entries(params)
    .map((entry) => entry.join('='))
    .join('&');
}
