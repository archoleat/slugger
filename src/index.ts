const slugger = (text: string, config?: Record<string, string>): string => {
  const isCustomConfig = config !== undefined;
  const isEmptyConfig = isCustomConfig && Object.keys(config).length === 0;
  const transliterateMap: Record<string, string> = isCustomConfig
    ? config
    : {
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
        й: 'j',
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
        х: 'kh',
        ц: 'c',
        ч: 'ch',
        ш: 'sh',
        щ: 'shch',
        ъ: 'j',
        ы: 'y',
        ь: "'",
        э: 'eh',
        ю: 'yu',
        я: 'ya',
      };

  return text
    .toLowerCase()
    .split('')
    .map((character) => {
      if (character in transliterateMap) {
        return transliterateMap[character];
      }

      if (isEmptyConfig && /\p{L}|\d/u.test(character)) {
        return character;
      }

      if (!isEmptyConfig && /[a-z0-9]/.test(character)) {
        return character;
      }

      return '-';
    })
    .join('')
    .replaceAll(/-+/g, '-')
    .replaceAll(/(^-|-$)/g, '');
};

export { slugger };
