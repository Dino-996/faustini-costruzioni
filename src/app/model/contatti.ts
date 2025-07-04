export interface Orari {
  id: number,
  giorno: string,
  orariMattina: string,
  orariPomeriggio: string
}

export interface OpzioniOggetto {
  id: number,
  value: string,
  label: string
}

export interface InformazioniContatto {
  id: number,
  tipo: string,
  icona: string,
  titolo: string,
  informazioni: string[]
}

export interface Messaggi {
  id?: string,
  nome: string, 
  cognome: string,
  email: string,
  telefono?: string,
  oggetto: string,
  privacy_policy: boolean
}