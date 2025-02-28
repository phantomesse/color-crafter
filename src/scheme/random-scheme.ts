import { generateRandomColor } from '../color/color-manipulation-utils';
import { ColorModel } from '../color/color-model';
import { SchemeInterface } from './scheme-interface';
import { SchemeModel } from './scheme-model';

export class RandomScheme implements SchemeInterface {
  name: string = 'random scheme';

  generate(colorCount: number, seed?: ColorModel): SchemeModel {
    seed ??= generateRandomColor();
    return {
      seed,
      colors: [
        seed,
        ...Array.from(Array(colorCount - 1), () => generateRandomColor()),
      ],
    };
  }
}
