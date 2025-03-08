type Parameters = {
  text: string;
  config?: {
    letterCase?: 'lower' | 'upper';
    splitWords?: '-' | '_' | ' ' | '.';
    ё?: 'yo' | 'e';
    й?: 'j' | 'y';
    ц?: 'c' | 'ts';
    щ?: 'shch' | 'sch' | 'shh';
    э?: 'eh' | 'e';
  };
};

export type { Parameters };
