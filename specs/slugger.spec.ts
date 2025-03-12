import { describe, expect, test as spec } from 'bun:test';

import { slugger } from '#src/index.ts';
import type { Config } from '#types/config.ts';

describe('Slugger Function', () => {
  spec('should handle letter case', async () => {
    const specs = [
      {
        text: 'В чащах юга жил-был цитрус, но фальшивый экземпляр.',
        output: "v-chashchah-yuga-zhil-byl-citrus-no-fal'shivyj-ehkzemplyar",
      },
      {
        text: 'В чащах юга жил-был цитрус, но фальшивый экземпляр.',
        config: { letterCase: 'initial' } as Config,
        output: "V-chashchah-yuga-zhil-byl-citrus-no-fal'shivyj-ehkzemplyar",
      },
    ];

    for (const { text, output, config } of specs) {
      expect(await slugger(text, config)).toBe(output);
    }
  });

  spec('should handle split character', async () => {
    const specs = [
      {
        text: 'В чащах юга жил-был цитрус, но фальшивый экземпляр.',
        output: "v-chashchah-yuga-zhil-byl-citrus-no-fal'shivyj-ehkzemplyar",
      },
      {
        text: 'В чащах юга жил-был цитрус, но фальшивый экземпляр.',
        config: { splitCharacter: '_' } as Config,
        output: "v_chashchah_yuga_zhil_byl_citrus_no_fal'shivyj_ehkzemplyar",
      },
      {
        text: 'В чащах юга жил-был цитрус, но фальшивый экземпляр.',
        config: { splitCharacter: '.' } as Config,
        output: "v.chashchah.yuga.zhil.byl.citrus.no.fal'shivyj.ehkzemplyar",
      },
      {
        text: 'В чащах юга жил-был цитрус, но фальшивый экземпляр.',
        config: { splitCharacter: ' ' } as Config,
        output: "v chashchah yuga zhil byl citrus no fal'shivyj ehkzemplyar",
      },
    ];

    for (const { text, output, config } of specs) {
      expect(await slugger(text, config)).toBe(output);
    }
  });

  spec('should handle edge cases', async () => {
    const specs = [
      { text: '', output: '' },
      { text: '   ', output: '' },
      { text: '123', output: '123' },
      {
        text: 'Привет Мир',
        config: { letterCase: 'initial' } as Config,
        output: 'Privet-Mir',
      },
      {
        text: 'Спец_символы!',
        config: { splitWords: '.' } as Config,
        output: 'spec.simvoly',
      },
      {
        text: 'Тест--двойной--дефис',
        output: 'test-dvojnoj-defis',
      },
      {
        text: 'Ёлка',
        output: 'yolka',
      },
    ];

    for (const { text, output, config } of specs) {
      config
        ? expect(await slugger(text, config)).toBe(output)
        : expect(await slugger(text)).toBe(output);
    }
  });
});
