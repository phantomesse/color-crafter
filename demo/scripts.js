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

  const textColor = colorCrafter.contrast(hexColor, 'AAA_SMALL_TEXT');
  colorCardElement.style.color = textColor;

  const labelElement = document.createElement('h2');
  labelElement.innerText = label;
  colorCardElement.append(labelElement);

  const hexColorElement = document.createElement('span');
  hexColorElement.innerText = hexColor.toUpperCase();
  colorCardElement.append(hexColorElement);

  const rgbColorElement = document.createElement('span');
  rgbColorElement.innerText =
    'rgb(' + Object.values(colorCrafter.hexToRgb(hexColor)).join(', ') + ')';
  colorCardElement.append(rgbColorElement);

  return colorCardElement;
}

function createColorGridElement(baseHexColor, label) {
  const colorGridElement = document.createElement('div');
  colorGridElement.className = 'color-grid';

  let lighterHexColor = colorCrafter.lighten(baseHexColor, {
    contrastRatio: 2,
  });
  if (lighterHexColor === '#ffffff') {
    colorCrafter.lighten(baseHexColor, {
      percent: 0.3,
    });
  }

  const darkerHexColor = colorCrafter.darken(baseHexColor, {
    contrastRatio: 2,
  });

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
