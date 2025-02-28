import { getParamValue, setParamValue } from './url-utils.mjs';

export const SchemeSource = {
  RANDOM: 'random seed',
  FROM_IMAGE: 'generate from image',
  FROM_TEXT: 'generate from text',
};

const _PARAM_KEY = 'schemeSource';

export class SchemeSourceSelectElement extends HTMLSelectElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Add an option element for each scheme source.
    for (const schemeSource in SchemeSource) {
      const optionElement = document.createElement('option');
      optionElement.value = schemeSource;
      optionElement.textContent = SchemeSource[schemeSource];
      this.appendChild(optionElement);
    }
    const schemeSource = getParamValue(_PARAM_KEY);
    if (schemeSource) this.value = schemeSource;

    // Update url when the option changes.
    const self = this;
    this.addEventListener('change', () => {
      setParamValue(_PARAM_KEY, self.value);
    });
  }
}
