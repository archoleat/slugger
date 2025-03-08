import { HAfterParameters, Parameters } from '#types/parameters.ts';

const slugger = async (parameters: Parameters): Promise<string> => {
  const { text, config = {} } = parameters;
  const {
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

        const shouldUseKh = () => {
          if (hAfter === 'always') return true;
          if (!previousCharacter) return false;

          const allowedChars = hAfter;

          return allowedChars.includes(previousCharacter as HAfterParameters);
        };

        replacedCharacters = shouldUseKh() ? ['k', 'h'] : ['h'];
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
    .replace(/-+/g, splitWords)
    .replace(/(^-|-$)/g, '');
};

export { slugger };
