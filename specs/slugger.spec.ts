import { describe, expect, test as spec } from 'bun:test';
import { slugger } from '#src/index.ts';
import type { Parameters } from '#types/parameters.ts';

describe('Slugger Function', () => {
  spec('should transliterate cyrillic text', async () => {
    const specs = [
      {
        parameters: { text: 'Классический борщ с говядиной' },
        output: 'klassicheskij-borshch-s-govyadinoj',
      },
      {
        parameters: { text: 'кх зх сх ех хх' },
        output: 'kkh-zkh-skh-ekh-hkh',
      },
      {
        parameters: { text: 'ах мх' },
        output: 'ah-mh',
      },
      {
        parameters: { text: 'кох' },
        output: 'koh',
      },
      {
        parameters: { text: 'холод' },
        output: 'holod',
      },
    ];

    for (const { parameters, output } of specs) {
      expect(await slugger({ ...parameters, options: {} })).toBe(output);
    }
  });

  spec('should handle letter case', async () => {
    const specs = [
      {
        parameters: {
          text: 'Пример Текста',
          options: { letterCase: 'upper' },
        },
        output: 'PRIMER-TEKSTA',
      },
      {
        parameters: {
          text: 'ХоЛоСцЫй ТЕКСТ',
          options: { letterCase: 'lower' },
        },
        output: 'holostyj-tekst',
      },
      {
        parameters: {
          text: 'Смешанный Регистр',
          options: { letterCase: 'upper' },
        },
        output: 'SMESHANNYJ-REGISTR',
      },
    ];

    for (const { parameters, output } of specs) {
      expect(await slugger(parameters)).toBe(output);
    }
  });

  spec('should support custom replacements', async () => {
    const specs = [
      {
        parameters: {
          text: 'Цирк Ёж Щука',
          options: {
            ё: 'e',
            щ: 'sch',
            ц: 'ts',
          },
        },
        output: 'tsirk-ezh-schuka',
      },
      {
        parameters: {
          text: 'Эх, Йогурт!',
          options: {
            э: 'e',
            й: 'y',
          },
        },
        output: 'ehy-yogurt',
      },
    ];

    for (const { parameters, output } of specs) {
      expect(await slugger(parameters)).toBe(output);
    }
  });

  spec('should handle custom separators', async () => {
    const specs = [
      {
        parameters: {
          text: 'Разделители Слов',
          options: { splitWords: '_' },
        },
        output: 'razdeliteli_slov',
      },
      {
        parameters: {
          text: 'Много   пробелов',
          options: { splitWords: '+' },
        },
        output: 'mnogo+probelov',
      },
    ];

    for (const { parameters, output } of specs) {
      expect(await slugger(parameters)).toBe(output);
    }
  });

  spec('should handle edge cases', async () => {
    const specs = [
      { parameters: { text: '' }, output: '' },
      { parameters: { text: '   ' }, output: '' },
      { parameters: { text: '123' }, output: '123' },
      {
        parameters: {
          text: 'Привет Мир',
          options: { letterCase: 'upper' },
        },
        output: 'PRIVET-MIR',
      },
      {
        parameters: {
          text: 'Спец_символы!',
          options: { splitWords: '.' },
        },
        output: 'spec.simvoly',
      },
    ];

    for (const { parameters, output } of specs) {
      expect(await slugger(parameters)).toBe(output);
    }
  });
});
