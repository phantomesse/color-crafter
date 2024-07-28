import {
  COLOR_NAME_TO_HEX_COLOR_MAP,
  getColorNameSource,
  HEX_COLOR_TO_COLOR_NAME_MAP,
} from './color-names.mjs';
import { Color } from './color.mjs';
import { updateSeedColors } from './url.mjs';

export class ColorCard extends HTMLElement {
  constructor() {
    super();
    this.isEditable = false;
    this.themeName;
  }

  setEditable(themeName) {
    this.isEditable = true;
    this.themeName = themeName;
  }

  connectedCallback() {
    this.color = new Color(this.getAttribute('hex-color'));
    this.style.setProperty('--bg-color', this.color.hex);

    function createTextElement(text, parentContainer, tag = 'span') {
      const element = document.createElement(tag);
      element.innerText = text;
      parentContainer.appendChild(element);
      return element;
    }

    // Label.
    createTextElement(this.getAttribute('label'), this, 'h2');

    // Color name.
    const colorName = this.color.name;
    const hexForColorName = COLOR_NAME_TO_HEX_COLOR_MAP[colorName];
    if (colorName) {
      if (hexForColorName === this.color.hex) {
        // Exact match.
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-pencil';
        createTextElement(colorName, this, 'h3').prepend(icon);
      } else {
        // Similar color.
        const similarColorElement = document.createElement('a');
        similarColorElement.className = 'similar-color';
        similarColorElement.style.setProperty('--color', hexForColorName);
        similarColorElement.innerText = colorName;
        similarColorElement.addEventListener('click', () => {
          updateSeedColors(hexForColorName);
        });

        createTextElement('Similar to ', this, 'h3').appendChild(
          similarColorElement
        );
      }
    }

    // Add theme selector if neccessary.
    if (this.isEditable) {
      const themeSelector = document.createElement('theme-selector');
      themeSelector.setAttribute('theme-name', this.themeName);
      this.appendChild(themeSelector);
    }

    // Footer.
    const footerContainer = document.createElement('div');
    footerContainer.className = 'footer';
    this.appendChild(footerContainer);

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
    footerContainer.appendChild(metadataContainer);

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
    footerContainer.appendChild(conformanceLevelContainer);
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
