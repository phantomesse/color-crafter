import { ColorCardElement } from './color-card.mjs';
import {
  COLOR_SCHEME_CHANGE_EVENT_NAME,
  ColorSchemeElement,
} from './color-scheme.mjs';
import { SchemeSource, SchemeSourceSelectElement } from './scheme-source.mjs';
import { SchemeType, SchemeTypeSelectElement } from './scheme-type.mjs';

// Define custom elements.
customElements.define('scheme-source-select', SchemeSourceSelectElement, {
  extends: 'select',
});
customElements.define('scheme-type-select', SchemeTypeSelectElement, {
  extends: 'select',
});
customElements.define('color-card', ColorCardElement);
customElements.define('color-scheme', ColorSchemeElement);

const schemeSource = document.querySelector(
  '[is="scheme-source-select"]'
).value;
const schemeType = document.querySelector('[is="scheme-type-select"]').value;

const seed = colorCrafter.generateRandomColor();
const colorScheme = colorCrafter.Schemes[schemeType].generate(5, seed);

// Update background and foreground colors for the page.
const bgColor =
  seed.hsl.l > 50
    ? colorCrafter.lightenColor(seed, { percent: 0.2 })
    : colorCrafter.darkenColor(seed, { percent: 0.2 });
const fgColor = colorCrafter.getContrastingColor(
  bgColor,
  colorCrafter.ContrastConformanceLevel.AAA_LARGE_TEXT
);
document.body.style.setProperty('--bg-color', bgColor.hex);
document.body.style.setProperty('--fg-color', fgColor.hex);

// Update color scheme element.
document.dispatchEvent(
  new CustomEvent(COLOR_SCHEME_CHANGE_EVENT_NAME, {
    detail: { colorScheme },
  })
);
