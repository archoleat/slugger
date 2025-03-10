type HAfterConfig = 'k' | 'z' | 'c' | 's' | 'e' | 'h';

type Config = {
  letterCase?: 'lower' | 'initial';
  splitWords?: '-' | '_' | ' ' | '.';
  ё?: 'yo' | 'e';
  Ё?: 'Yo' | 'E';
  й?: 'j' | 'y';
  Й?: 'J' | 'Y';
  ц?: 'c' | 'ts';
  Ц?: 'C' | 'Ts';
  щ?: 'shch' | 'sch' | 'shh';
  Щ?: 'Shch' | 'Sch' | 'Shh';
  э?: 'eh' | 'e';
  Э?: 'Eh' | 'E';
  hAfter?: Array<HAfterConfig> | 'always';
};

export type { Config, HAfterConfig };
