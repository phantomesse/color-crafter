import { ColorModel } from '../color/color-model';
import { SchemeModel } from './scheme-model';

export interface SchemeInterface {
  name: string;
  generate(colorCount: number, seed?: ColorModel): SchemeModel;
}
