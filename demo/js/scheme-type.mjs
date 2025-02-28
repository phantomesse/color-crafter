import { getParamValue, setParamValue } from './url-utils.mjs';

export const SchemeType = Object.fromEntries(
  Object.entries(colorCrafter.Schemes).map(([schemeType, scheme]) => [
    schemeType,
    scheme.name,
  ])
);

const _PARAM_KEY = 'schemeType';

export class SchemeTypeSelectElement extends HTMLSelectElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Add an option element for each scheme type.
    for (const schemeType in SchemeType) {
      const optionElement = document.createElement('option');
      optionElement.value = schemeType;
      optionElement.textContent = SchemeType[schemeType];
      this.appendChild(optionElement);
    }
    const schemeType = getParamValue(_PARAM_KEY);
    if (schemeType) this.value = schemeType;

    // Emit an event when the option changes.
    const self = this;
    this.addEventListener('change', () => {
      setParamValue(_PARAM_KEY, self.value);
    });
  }
}
