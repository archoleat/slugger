import { Parameters } from '#types/parameters.ts';

const slugger = async (parameters: Parameters): Promise<string> => {
  const { text, config = {} } = parameters;
  const {
    // letterCase = 'lower',
    splitWords = '-',
    ё = 'yo',
    й = 'j',
    ц = 'c',
    щ = 'shch',
    э = 'eh',
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

        if (
          previousCharacter &&
          ['k', 'z', 'c', 's', 'e', 'h'].includes(previousCharacter)
        ) {
          replacedCharacters = ['k', 'h'];
        } else {
          replacedCharacters = ['h'];
        }
      } else {
        let replacement: string;

        if (transliterateMap[currentCharacter]) {
          replacement = transliterateMap[currentCharacter];
        } else if (/\d/.test(currentCharacter)) {
          replacement = currentCharacter;
        } else {
          replacement = splitWords;
        }

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
