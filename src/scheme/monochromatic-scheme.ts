import { ColorModel } from '../color/color-model';
import { SchemeInterface } from './scheme-interface';
import { SchemeModel } from './scheme-model';

export class MonochromaticScheme implements SchemeInterface {
  name: string = 'monochromatic scheme';

  generate(colorCount: number, seed?: ColorModel): SchemeModel {
    const hlBuckets = Array.from(Array(colorCount), (_, index) => ({
      min: (index * 100) / colorCount,
      max: ((index + 1) * 100) / colorCount,
    })).filter(
      (hlBucket) => !(seed.hsl.l >= hlBucket.min && seed.hsl.l <= hlBucket.max)
    );

    const colors = [
      seed,
      ...hlBuckets.map((hlBucket) =>
        ColorModel.fromHsl({
          h: seed.hsl.h,
          s: Math.floor(Math.random() * 100),
          l: Math.floor(
            Math.random() * (hlBucket.max - hlBucket.min) + hlBucket.min
          ),
        })
      ),
    ].sort((color1, color2) => color2.hsl.l - color1.hsl.l);

    return { seed, colors };
  }
}
