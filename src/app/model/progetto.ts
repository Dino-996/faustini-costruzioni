export type tipoProgetto = 'Residenziale' | 'Commerciale' | 'Infrastrutturale' | 'Ristrutturazione';

export interface materialiPrincipali {
    nome: string;
    quantita?: string;
    fornitore?: string;
};