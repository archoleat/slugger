import { describe, expect, test as spec } from 'bun:test';

import { slugger } from '#src/index.ts';
import type { Config } from '#types/config.ts';

describe('Slugger Function', () => {
  spec('should transliterate cyrillic text', async () => {
    const specs = [
      {
        text: 'Классический борщ с говядиной',
        output: 'klassicheskij-borshch-s-govyadinoj',
      },
      {
        text: 'кх зх сх ех хх',
        output: 'kkh-zkh-skh-ekh-khkh',
      },
      {
        text: 'ах мх',
        output: 'ah-mh',
      },
      {
        text: 'кох',
        output: 'koh',
      },
      {
        text: 'холод',
        output: 'holod',
      },
      {
        text: 'хлеб',
        output: 'hleb',
      },
      {
        text: 'хрю',
        output: 'hryu',
      },
    ];

    for (const { text, output } of specs) {
      expect(await slugger(text)).toBe(output);
    }
  });

  spec('should handle letter case', async () => {
    const specs = [
      {
        text: 'ХоЛоСცЫй ТЕКСТ',
        config: { letterCase: 'lower' } as Config,
        output: 'holostyj-tekst',
      },
      {
        text: 'Смешанный Регистр',
        config: { letterCase: 'initial' } as Config,
        output: 'Smeshannyj-Registr',
      },
      {
        text: 'ПЕРВЫЙ СИМВОЛ',
        config: { letterCase: 'initial' } as Config,
        output: 'Pervyj-Simvol',
      },
    ];

    for (const { text, output, config } of specs) {
      expect(await slugger(text, config)).toBe(output);
    }
  });

  spec('should support custom replacements', async () => {
    const specs = [
      {
        text: 'Цирк Ёж Щука',
        config: {
          ё: 'e',
          щ: 'sch',
          ц: 'ts',
        } as Config,
        output: 'tsirk-ezh-schuka',
      },
      {
        text: 'Эх, Йогурт!',
        config: {
          э: 'e',
          й: 'y',
        } as Config,
        output: 'e-yogurt',
      },
      {
        text: 'Щука цыпленок',
        config: {
          щ: 'shh',
          Щ: 'Shh',
          ц: 'ts',
        } as Config,
        output: 'shhuka-tsyplenok',
      },
      {
        text: 'Цезарь',
        config: { ц: 'ts' } as Config,
        output: 'tsezar',
      },
    ];

    for (const { text, output, config } of specs) {
      expect(await slugger(text, config)).toBe(output);
    }
  });

  spec('should handle custom separators', async () => {
    const specs = [
      {
        text: 'Разделители Слов',
        config: { splitWords: '_' } as Config,
        output: 'razdeliteli_slov',
      },
      {
        text: 'Много   пробелов',
        config: { splitWords: ' ' } as Config,
        output: 'mnogo probelov',
      },
      {
        text: 'Спец.символы',
        config: { splitWords: '.' } as Config,
        output: 'spec.simvoly',
      },
      {
        text: 'Дефис-в-слове',
        config: {},
        output: 'defis-v-slove',
      },
    ];

    for (const { text, output, config } of specs) {
      expect(await slugger(text, config)).toBe(output);
    }
  });

  spec('should handle hAfter configuration', async () => {
    const specs = [
      {
        text: 'х кх зхх',
        config: { hAfter: 'always' } as Config,
        output: 'kh-kh-zkhh',
      },
      {
        text: 'кх ах мх',
        config: { hAfter: ['k'] } as Config,
        output: 'kkh-ah-mh',
      },
      {
        text: 'ххх',
        config: { hAfter: ['s', 'h'] } as Config,
        output: 'hhkh',
      },
      {
        text: 'шх хш',
        config: { hAfter: ['sh'] } as Config,
        output: 'shh-hsh',
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
        config: {} as Config,
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
