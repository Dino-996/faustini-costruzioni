export interface InformazioniContatto {
  id: number,
  icon: string;
  href: string;
  text: string;
  ariaLabel: string;
}

export interface LinkUtili {
  id: number,
  text: string;
  href: string;
  external: boolean;
}

export interface LinkSocial {
  id: number,
  platform: string;
  href: string;
  icon: string;
}

export interface FAQ {
  id: number,
  question: string;
  answer: string;
}