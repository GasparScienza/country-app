export interface Country {
  capital: string;
  name: string;
  population: number;
  flag: string;
  flags: Flags;
  cca2: string;
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}
