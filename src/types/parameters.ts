type HAfterParameters = 'k' | 'z' | 'c' | 's' | 'e' | 'h';

type Parameters = {
  letterCase?: 'lower' | 'upper';
  splitWords?: '-' | '_' | ' ' | '.';
  ё?: 'yo' | 'e';
  й?: 'j' | 'y';
  ц?: 'c' | 'ts';
  щ?: 'shch' | 'sch' | 'shh';
  э?: 'eh' | 'e';
  hAfter?: Array<HAfterParameters> | 'always';
};

export type { HAfterParameters, Parameters };
