import { describe, expect, test as spec } from 'bun:test';

import { slugger } from '#src/index.ts';

describe('Slugger Function', () => {
  spec('should transliterate cyrillic text', async () => {
    const specs = [
      {
        text: 'Классический борщ с говядиной',
        output: 'klassicheskij-borshch-s-govyadinoj',
      },
      {
        text: 'кх зх сх ех хх',
        output: 'kkh-zkh-skh-ekh-hkh',
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
    ];

    for (const { text, output } of specs) {
      expect(await slugger(text)).toBe(output);
    }
  });

  spec('should handle letter case', async () => {
    const specs = [
      {
        text: 'ХоЛоСცЫй ТЕКСТ',
        config: { letterCase: 'lower' },
        output: 'holostyj-tekst',
      },
      {
        text: 'Смешанный Регистр',
        config: { letterCase: 'initial' },
        output: 'Smeshannyj-Registr',
      },
    ];

    for (const { text, config, output } of specs) {
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
        },
        output: 'tsirk-ezh-schuka',
      },
      {
        text: 'Эх, Йогурт!',
        config: {
          э: 'e',
          й: 'y',
        },
        output: 'eh-yogurt',
      },
      {
        text: 'Щука цыпленок',
        config: {
          щ: 'shh',
          Щ: 'Shh',
          ц: 'ts',
        },
        output: 'shhuka-tsyplenok',
      },
    ];

    for (const { text, config, output } of specs) {
      expect(await slugger(text, config)).toBe(output);
    }
  });

  spec('should handle custom separators', async () => {
    const specs = [
      {
        text: 'Разделители Слов',
        config: { splitWords: '_' },
        output: 'razdeliteli_slov',
      },
      {
        text: 'Много   пробелов',
        config: { splitWords: ' ' },
        output: 'mnogo   probelov',
      },
      {
        text: 'Спец.символы',
        config: { splitWords: '.' },
        output: 'spec.simvoly',
      },
    ];

    for (const { text, config, output } of specs) {
      expect(await slugger(text, config)).toBe(output);
    }
  });

  spec('should handle hAfter configuration', async () => {
    const specs = [
      {
        text: 'х кх зхх',
        config: { hAfter: 'always' },
        output: 'kh-kkh-zkhh',
      },
      {
        text: 'кх ах мх',
        config: { hAfter: ['k'] },
        output: 'kkh-ah-mh',
      },
      {
        text: 'ххх',
        config: { hAfter: ['s', 'h'] },
        output: 'hhkh',
      },
    ];

    for (const { text, config, output } of specs) {
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
        config: { letterCase: 'initial' },
        output: 'Privet-Mir',
      },
      {
        text: 'Спец_символы!',
        config: { splitWords: '.' },
        output: 'spec.simvoly',
      },
      {
        text: 'Тест--двойной--дефис',
        config: {},
        output: 'test-dvojnoj-defis',
      },
    ];

    for (const { text, config, output } of specs) {
      expect(await slugger(text, config)).toBe(output);
    }
  });
});
