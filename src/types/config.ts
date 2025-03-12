type HAfterConfig = Array<'k' | 'z' | 'c' | 's' | 'e' | 'h'>;

type Config = {
  letterCase?: 'lower' | 'initial';
  splitCharacter?: '-' | '_' | ' ' | '.';
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
  hAfter?: HAfterConfig | 'always';
};

export type { Config, HAfterConfig };
