import { HYPHEN_REGEX, HYPHENS_REGEX } from '@archoleat/reglib';

import { Config, HAfterConfig } from '#types/config.ts';

const slugger = async (string: string, config: Config = {}): Promise<string> => {
  const {
    letterCase = 'lower',
    splitWords = '-',
    ё = 'yo',
    Ё = 'Yo',
    й = 'j',
    Й = 'J',
    ц = 'c',
    Ц = 'C',
    щ = 'shch',
    Щ = 'Shch',
    э = 'eh',
    Э = 'Eh',
    hAfter = ['k', 'z', 'c', 's', 'e', 'h'],
  } = config;

  const transliterateMap: Record<string, string> = {
    а: 'a',
    А: 'A',
    б: 'b',
    Б: 'B',
    в: 'v',
    В: 'V',
    г: 'g',
    Г: 'G',
    д: 'd',
    Д: 'D',
    е: 'e',
    Е: 'E',
    ё,
    Ё,
    ж: 'zh',
    Ж: 'Zh',
    з: 'z',
    З: 'Z',
    и: 'i',
    И: 'I',
    й,
    Й,
    к: 'k',
    К: 'K',
    л: 'l',
    Л: 'L',
    м: 'm',
    М: 'M',
    н: 'n',
    Н: 'N',
    о: 'o',
    О: 'O',
    п: 'p',
    П: 'P',
    р: 'r',
    Р: 'R',
    с: 's',
    С: 'S',
    т: 't',
    Т: 'T',
    у: 'u',
    У: 'U',
    ф: 'f',
    Ф: 'F',
    ц,
    Ц,
    ч: 'ch',
    Ч: 'Ch',
    ш: 'sh',
    Ш: 'Sh',
    щ,
    Щ,
    ъ: 'j',
    Ъ: 'J',
    ы: 'y',
    Ы: 'Y',
    ь: "'",
    Ь: "'",
    э,
    Э,
    ю: 'yu',
    Ю: 'Yu',
    я: 'ya',
    Я: 'Ya',
  };

  const formatterHAfter = (accumulator: HAfterConfig, currentCharacter: string) => {
    if (currentCharacter === 'х') {
      const previousCharacter =
        accumulator.length > 0 ? accumulator[accumulator.length - 1] : null;

      const shouldUseH = () => {
        if (hAfter === 'always') return true;

        return previousCharacter && hAfter.includes(previousCharacter);
      };

      const replacedCharacters = shouldUseH() ? ['k', 'h'] : ['h'];

      accumulator.push(...replacedCharacters);
    } else {
      const replacement =
        transliterateMap[currentCharacter] ??
        (/\d/.test(currentCharacter) ? currentCharacter : splitWords);

      const replacedCharacters = replacement.split('');

      accumulator.push(...replacedCharacters);
    }

    return accumulator;
  };

  const formattedString = string
    .split('')
    .reduce(
      (accumulator: HAfterConfig, currentCharacter: string) =>
        formatterHAfter(accumulator, currentCharacter),
      [],
    )
    .join('')
    .replace(HYPHEN_REGEX, splitWords)
    .replace(HYPHENS_REGEX, '');

  const result =
    letterCase === 'lower' ? formattedString.toLowerCase() : formattedString;

  return result;
};

export { slugger };
