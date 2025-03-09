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
    ];

    specs.forEach(async ({ text, output }) => {
      expect(await slugger(text)).toBe(output);
    });
  });

  spec('should handle letter case', async () => {
    const specs = [
      {
        text: 'Пример Текста',
        config: { letterCase: 'upper' },
        output: 'PRIMER-TEKSTA',
      },
      {
        text: 'ХоЛоСцЫй ТЕКСТ',
        config: { letterCase: 'lower' },
        output: 'holostyj-tekst',
      },
      {
        text: 'Смешанный Регистр',
        config: { letterCase: 'upper' },
        output: 'SMESHANNYJ-REGISTR',
      },
    ];

    specs.forEach(async ({ text, config, output }) => {
      expect(await slugger(text, config)).toBe(output);
    });
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
        output: 'ehy-yogurt',
      },
    ];

    specs.forEach(async ({ text, config, output }) => {
      expect(await slugger(text, config)).toBe(output);
    });
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
        config: { splitWords: '+' },
        output: 'mnogo+probelov',
      },
    ];

    specs.forEach(async ({ text, config, output }) => {
      expect(await slugger(text, config)).toBe(output);
    });
  });

  spec('should handle edge cases', async () => {
    const specs = [
      { text: '', output: '' },
      { text: '   ', output: '' },
      { text: '123', output: '123' },
      {
        text: 'Привет Мир',
        config: { letterCase: 'upper' },
        output: 'PRIVET-MIR',
      },
      {
        text: 'Спец_символы!',
        config: { splitWords: '.' },
        output: 'spec.simvoly',
      },
    ];

    specs.forEach(async ({ text, config, output }) => {
      expect(await slugger(text, config)).toBe(output);
    });
  });
});
