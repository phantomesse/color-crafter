import { ColorCardElement } from './color-card.mjs';

export const COLOR_SCHEME_CHANGE_EVENT_NAME = 'color palette change';

export class ColorSchemeElement extends HTMLElement {
  /** @type {ColorCardElement[]} */ colorCardElements;

  constructor() {
    super();
    this.colorCardElements = [];
  }

  connectedCallback() {
    const self = this;
    document.addEventListener(COLOR_SCHEME_CHANGE_EVENT_NAME, (event) => {
      for (const element of self.colorCardElements) {
        element.remove();
      }
      self.colorCardElements = [];

      const colorScheme = event.detail.colorScheme;
      const colors = colorScheme.colors;
      for (const color of colors) {
        this.colorCardElements.push(createColorCardElement(color, self));
      }
    });
  }
}

/**
 * @param {colorCrafter.ColorModel} color
 * @param {ColorSchemeElement} parentElement
 * @returns {ColorCardElement}
 */
function createColorCardElement(color, parentElement) {
  const element = document.createElement('color-card');
  element.setAttribute('hex-color', color.hex);
  element.setAttribute(
    'hsl-color',
    `hsl(${[color.hsl.h, color.hsl.s, color.hsl.l].join(', ')})`
  );
  element.setAttribute(
    'rgb-color',
    `rgb(${[color.rgb.r, color.rgb.g, color.rgb.b].join(', ')})`
  );
  parentElement.appendChild(element);
  return element;
}
