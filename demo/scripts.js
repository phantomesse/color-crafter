const baseColor = generateRandomHexColor();

document.body.append(createColorGridElement(baseColor));

function generateRandomHexColor() {
  const rgbColor = Array(3)
    .fill(0)
    .map(() => Math.floor(Math.random() * 255));
  return colorCrafter.rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
}

/** @param {string} hexColor */
function createColorCardElement(hexColor, label) {
  const colorCardElement = document.createElement('div');
  colorCardElement.className = 'color-card';
  colorCardElement.style.backgroundColor = hexColor;

  const textColor = colorCrafter.contrast(hexColor, 'AA_SMALL_TEXT');
  colorCardElement.style.color = textColor;

  const labelElement = document.createElement('h2');
  labelElement.innerText = label;
  colorCardElement.append(labelElement);

  function appendText(text, tag = 'span') {
    const element = document.createElement(tag);
    element.innerText = text;
    colorCardElement.append(element);
  }

  appendText(hexColor.toUpperCase());
  appendText(
    'rgb(' + Object.values(colorCrafter.hexToRgb(hexColor)).join(', ') + ')'
  );
  appendText(
    'hsl(' + Object.values(colorCrafter.hexToHsl(hexColor)).join(', ') + ')'
  );

  const hslColorElement = document.createElement('span');
  colorCardElement.append(hslColorElement);

  return colorCardElement;
}

function createColorGridElement(baseHexColor, label) {
  const colorGridElement = document.createElement('div');
  colorGridElement.className = 'color-grid';

  const baseHslColor = colorCrafter.hexToHsl(baseHexColor);

  const amountToLighten =
    Math.round(Math.random() * (100 - baseHslColor.l)) / 2 +
    (100 - baseHslColor.l) / 2;
  const lighterHexColor = colorCrafter.lighten(baseHexColor, amountToLighten);

  const amountToDarken = Math.min(
    amountToLighten,
    Math.round((Math.random() * baseHslColor.l) / 2 + baseHslColor.l / 2)
  );
  const darkerHexColor = colorCrafter.darken(baseHexColor, amountToDarken);

  colorGridElement.append(
    createColorCardElement(
      colorCrafter.shift(colorCrafter.desaturate(lighterHexColor, 20), 20),
      'Lighter Color'
    )
  );
  colorGridElement.append(
    createColorCardElement(
      colorCrafter.shift(colorCrafter.desaturate(baseHexColor, 20), 20),
      'Base Color'
    )
  );
  colorGridElement.append(
    createColorCardElement(
      colorCrafter.shift(colorCrafter.desaturate(darkerHexColor, 20), 20),
      'Darker Color'
    )
  );

  colorGridElement.append(
    createColorCardElement(lighterHexColor, 'Lighter Color')
  );
  colorGridElement.append(createColorCardElement(baseHexColor, 'Base Color'));
  colorGridElement.append(
    createColorCardElement(darkerHexColor, 'Darker Color')
  );

  colorGridElement.append(
    createColorCardElement(
      colorCrafter.shift(colorCrafter.saturate(lighterHexColor, 40), -180),
      'Lighter Color'
    )
  );
  colorGridElement.append(
    createColorCardElement(
      colorCrafter.shift(colorCrafter.saturate(baseHexColor, 40), -180),
      'Base Color'
    )
  );
  colorGridElement.append(
    createColorCardElement(
      colorCrafter.shift(colorCrafter.saturate(darkerHexColor, 40), -180),
      'Darker Color'
    )
  );

  return colorGridElement;
}