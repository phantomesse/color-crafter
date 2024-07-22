import { describe, test, expect } from '@jest/globals';
import { asHexColor, isHexColor } from './hex-color';

describe('hex color', () => {
  test(`${isHexColor.name}`, () => {
    expect(isHexColor({})).toBe(false);
    expect(isHexColor(0)).toBe(false);
    expect(isHexColor(null)).toBe(false);
    expect(isHexColor('F7C')).toBe(false);
    expect(isHexColor('#F7CA')).toBe(false);
    expect(isHexColor('e32d8d')).toBe(false);
    expect(isHexColor('E32D8D')).toBe(false);
    expect(isHexColor('e32D8dcC')).toBe(false);
    expect(isHexColor('#eg2d8d')).toBe(false);

    expect(isHexColor('#e32d8d')).toBe(true);
    expect(isHexColor('#000000')).toBe(true);
  });

  test(`${asHexColor.name}`, () => {
    expect(asHexColor('F7C')).toBe('#ff77cc');
    expect(asHexColor('f7ca')).toBe('#ff77cc');
    expect(asHexColor('#f7c')).toBe('#ff77cc');
    expect(asHexColor('#F7C')).toBe('#ff77cc');
    expect(asHexColor('#F7CA')).toBe('#ff77cc');

    expect(asHexColor('e32d8d')).toBe('#e32d8d');
    expect(asHexColor('E32D8D')).toBe('#e32d8d');
    expect(asHexColor('e32D8dcC')).toBe('#e32d8d');
    expect(asHexColor('#E32D8DCCAB')).toBe('#e32d8d');
    expect(asHexColor('#E32D8D')).toBe('#e32d8d');
    expect(asHexColor('#E32D8DCC')).toBe('#e32d8d');

    expect(asHexColor('ff')).toBe('#000000');
    expect(asHexColor('#ff')).toBe('#000000');
    expect(asHexColor('#ag3')).toBe('#000000');
    expect(asHexColor('#ag3def')).toBe('#000000');
    expect(asHexColor('#000000')).toBe('#000000');
  });
});
