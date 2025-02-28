export class ColorCardElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Get colors.
    const hexColor = this.getAttribute('hex-color');
    const hslColor = this.getAttribute('hsl-color');
    const rgbColor = this.getAttribute('rgb-color');
    const color = colorCrafter.ColorModel.fromHex(hexColor);

    // Set background color.
    this.style.setProperty('--bg-color', hexColor);

    // Set foreground color.
    const fgColor = colorCrafter.getContrastingColor(
      color,
      colorCrafter.ContrastConformanceLevel.AAA_LARGE_TEXT
    );
    this.style.setProperty('--fg-color', fgColor.hex);

    // Add labels.
    createSpanElement('Color', this, 'color-name');
    createSpanElement(hexColor, this);
    createSpanElement(hslColor, this);
    const element = createSpanElement(rgbColor, this);
    element.style.marginBottom = '16px';

    for (const conformanceLevel in colorCrafter.ContrastConformanceLevel) {
      const hexColor = colorCrafter.getContrastingColor(
        color,
        colorCrafter.ContrastConformanceLevel[conformanceLevel]
      ).hex;

      const conformanceLevelElement = document.createElement('div');
      conformanceLevelElement.className = 'conformance-level';

      const colorElement = createSpanElement(hexColor, conformanceLevelElement);
      colorElement.style.background = hexColor;
      colorElement.style.color = color.hex;

      const label = conformanceLevel.replaceAll('_', ' ').toLocaleLowerCase();
      createSpanElement(label, conformanceLevelElement);

      this.appendChild(conformanceLevelElement);
    }
  }
}

/**
 * @param {string} text
 * @param {ColorCardElement} parentElement
 * @param {...string} classNames
 */
function createSpanElement(text, parentElement, ...classNames) {
  const element = document.createElement('span');
  element.textContent = text;

  for (const className of classNames) {
    element.classList.add(className);
  }

  parentElement.appendChild(element);
  return element;
}
