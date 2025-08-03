import { describe, expect, test as spec } from 'bun:test';
import { slugger } from '#src/index.ts';

describe('Slugger Function', () => {
  spec('should transliterate cyrillic text', async () => {
    const result = await slugger('Классический борщ с говядиной');

    expect(result).toBe('klassicheskij-borshch-s-govyadinoj');
  });

  spec('should handle special characters', async () => {
    const tests = [
      { input: 'Программирование 2023!', output: 'programmirovanie-2023' },
      { input: 'Ёлка в лесу', output: 'yolka-v-lesu' },
      { input: 'Съёмка "фильма"', output: "sjyomka-fil'ma" },
      { input: 'Путь к_файлу.', output: "put'-k-fajlu" },
    ];

    for (const { input, output } of tests) {
      expect(await slugger(input)).toBe(output);
    }
  });

  spec('should format hyphen correctly', async () => {
    const tests = [
      { input: '  много   пробелов  ', output: 'mnogo-probelov' },
      { input: '---начало-и-конец---', output: 'nachalo-i-konec' },
      { input: 'Смешаные!@#Символы', output: 'smeshanye-simvoly' },
      {
        input: "Снова!@#- ._'№;$%^:&*()+={}привет,[]|опять\\/<>~`здесь?",
        output: "snova-privet-opyat'-zdes'",
      },
    ];

    for (const { input, output } of tests) {
      expect(await slugger(input)).toBe(output);
    }
  });

  spec('should handle custom config', async () => {
    const tests = [
      { input: 'Программирование 2023!', output: 'programmirovanie-2023' },
      { input: 'Ёлка в лесу', output: 'yolka-v-lesu' },
      { input: 'Съёмка "фильма"', output: 'sjyomka-fil-ma' },
      { input: 'Путь к_файлу.', output: 'put-k-failu' },
    ];

    for (const { input, output } of tests) {
      expect(
        await slugger(input, {
          а: 'a',
          б: 'b',
          в: 'v',
          г: 'g',
          д: 'd',
          е: 'e',
          ё: 'yo',
          ж: 'zh',
          з: 'z',
          и: 'i',
          й: 'i',
          к: 'k',
          л: 'l',
          м: 'm',
          н: 'n',
          о: 'o',
          п: 'p',
          р: 'r',
          с: 's',
          т: 't',
          у: 'u',
          ф: 'f',
          х: 'h',
          ц: 'c',
          ч: 'c',
          ш: 'sh',
          щ: 'shch',
          ъ: 'j',
          ы: 'y',
          э: 'eh',
          ю: 'yu',
          я: 'ya',
        }),
      ).toBe(output);
    }
  });

  spec('should handle edge cases', async () => {
    expect(await slugger('')).toBe('');
    expect(await slugger('   ')).toBe('');
    expect(await slugger('123')).toBe('123');
    expect(await slugger('Привет Мир')).toBe('privet-mir');
  });
});
