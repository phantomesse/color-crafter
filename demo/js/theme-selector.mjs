import { THEMES } from './theme.mjs';
import { updateTheme } from './url.mjs';

export class ThemeSelector extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const labelElement = document.createElement('span');
    labelElement.innerText = 'Theme:';
    this.append(labelElement);

    const selectElement = document.createElement('select');

    const optionElements = [];
    for (const theme of THEMES) {
      const optionElement = document.createElement('option');
      optionElement.innerText = theme.name;
      optionElement.value = theme.name;
      optionElement.selected = this.getAttribute('theme-name') === theme.name;
      selectElement.append(optionElement);
      optionElements.push(optionElement);
    }
    this.append(selectElement);

    selectElement.addEventListener('change', () => {
      updateTheme(optionElements[selectElement.selectedIndex].value);
    });
  }
}
