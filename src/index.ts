import { HYPHEN_REGEX, HYPHENS_REGEX } from '@archoleat/reglib';

import { Config, HAfterConfig } from '#types/config.ts';

const slugger = async (text: string, config: Config = {}): Promise<string> => {
  const {
    // letterCase = 'lower',
    splitWords = '-',
    ё = 'yo',
    й = 'j',
    ц = 'c',
    щ = 'shch',
    э = 'eh',
    hAfter = ['k', 'z', 'c', 's', 'e', 'h'],
  } = config;

  const transliterateMap: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё,
    ж: 'zh',
    з: 'z',
    и: 'i',
    й,
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
    ц,
    ч: 'ch',
    ш: 'sh',
    щ,
    ъ: 'j',
    ы: 'y',
    ь: "'",
    э,
    ю: 'yu',
    я: 'ya',
  };

  return text
    .toLowerCase()
    .split('')
    .reduce((accumulator: string[], currentCharacter) => {
      let replacedCharacters: string[];

      if (currentCharacter === 'х') {
        const previousCharacter =
          accumulator.length > 0 ? accumulator[accumulator.length - 1] : null;

        const shouldUseH = () => {
          if (hAfter === 'always') return true;
          if (!previousCharacter) return false;

          const allowedCharacters = hAfter;

          return allowedCharacters.includes(previousCharacter as HAfterConfig);
        };

        replacedCharacters = shouldUseH() ? ['k', 'h'] : ['h'];
      } else {
        const replacement: string =
          transliterateMap[currentCharacter] ??
          (/\d/.test(currentCharacter) ? currentCharacter : splitWords);

        replacedCharacters = replacement.split('');
      }

      accumulator.push(...replacedCharacters);

      return accumulator;
    }, [])
    .join('')
    .replace(HYPHEN_REGEX, splitWords)
    .replace(HYPHENS_REGEX, '');
};

export { slugger };
