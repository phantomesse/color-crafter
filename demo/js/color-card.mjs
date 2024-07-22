import { Color } from './color.mjs';

export class ColorCard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.color = new Color(this.getAttribute('hex-color'));
    this.style.setProperty('--bg-color', this.color.hex);

    function createTextElement(text, parentContainer, tag = 'span') {
      const element = document.createElement(tag);
      element.innerText = text;
      parentContainer.appendChild(element);
    }

    // Label.
    createTextElement(this.getAttribute('label'), this, 'h2');

    // Metadata.
    const metadataContainer = document.createElement('div');
    metadataContainer.className = 'metadata';
    createTextElement(this.color.hex.toUpperCase(), metadataContainer);
    createTextElement(
      'rgb(' + Object.values(this.color.rgb).join(', ') + ')',
      metadataContainer
    );
    createTextElement(
      'hsl(' + Object.values(this.color.hsl).join(', ') + ')',
      metadataContainer
    );
    this.appendChild(metadataContainer);

    // Text colors.
    const conformanceLevelToTextColorMap = Object.fromEntries(
      ['AA_LARGE_TEXT', 'AA_SMALL_TEXT', 'AAA_SMALL_TEXT'].map(
        conformanceLevel => [
          conformanceLevel,
          colorCrafter.contrast(this.color.hex, conformanceLevel),
        ]
      )
    );
    const conformanceLevelContainer = document.createElement('div');
    conformanceLevelContainer.className = 'conformance-levels';
    for (const conformanceLevel in conformanceLevelToTextColorMap) {
      const cssPropertyName =
        '--' + conformanceLevel.replace(/_/g, '-').toLowerCase();
      const hexColor = conformanceLevelToTextColorMap[conformanceLevel];
      this.style.setProperty(cssPropertyName, hexColor);

      const conformanceLevelElement = document.createElement('span');
      conformanceLevelElement.className = 'conformance-level';
      conformanceLevelElement.style.setProperty(
        '--color',
        `var(${cssPropertyName})`
      );
      conformanceLevelElement.innerText = conformanceLevel
        .replace(/_/g, ' ')
        .replace('SMALL', 'Small')
        .replace('LARGE', 'Large')
        .replace('TEXT', 'Text');

      const conformanceLevelHexElement = document.createElement('span');
      conformanceLevelHexElement.innerText = hexColor.toUpperCase();
      conformanceLevelElement.append(conformanceLevelHexElement);

      conformanceLevelContainer.appendChild(conformanceLevelElement);
    }
    this.appendChild(conformanceLevelContainer);
  }
}

/**
 * @param {string} hexColor
 * @param {string} label
 */
export function createColorCard(hexColor, label) {
  const element = document.createElement('color-card');
  element.setAttribute('hex-color', hexColor);
  element.setAttribute('label', label);
  return element;
}
