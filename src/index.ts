const slugger = async (text: string): Promise<string> => {
  const transliterateMap: Record<string, string> = {
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
      if (transliterateMap[character]) return transliterateMap[character];
      if (/[0-9]/.test(character)) return character;
      return '-';
    })
    .join('')
    .replace(/[-]+/g, '-')
    .replace(/^-|-$/g, '');
};

export { slugger };
