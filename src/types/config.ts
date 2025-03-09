type HAfterConfig = 'k' | 'z' | 'c' | 's' | 'e' | 'h';

type Config = {
  letterCase?: 'lower' | 'upper';
  splitWords?: '-' | '_' | ' ' | '.';
  ё?: 'yo' | 'e';
  й?: 'j' | 'y';
  ц?: 'c' | 'ts';
  щ?: 'shch' | 'sch' | 'shh';
  э?: 'eh' | 'e';
  hAfter?: Array<HAfterConfig> | 'always';
};

export type { Config, HAfterConfig };
