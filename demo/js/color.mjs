export class Color {
  /** @param {string} hex */
  constructor(hex) {
    this.hex = hex;
    this.rgb = colorCrafter.hexToRgb(hex);
    this.hsl = colorCrafter.hexToHsl(hex);
  }
}

/** @returns {Color} */
export function generateRandomColor() {
  const rgbColor = Array(3)
    .fill(0)
    .map(() => Math.floor(Math.random() * 255));
  return new Color(colorCrafter.rgbToHex(...rgbColor));
}
