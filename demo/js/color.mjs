export class Color {
  /**
   * @param {string} hex
   */
  constructor(hex) {
    this.hex = hex;
    this.rgb = colorCrafter.hexToRgb(hex);
    this.hsl = colorCrafter.hexToHsl(hsl);
  }
}
