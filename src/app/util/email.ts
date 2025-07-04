import emailjs from '@emailjs/browser';

export class Email {

    private readonly serviceId = 'faustini_costruzioni';
    private readonly templateIdContatti = 'fc_messaggio';
    private readonly templateIdPreventivo = 'fc_preventivo';
    private readonly publicKey = 'j1IAnXQOEsaEW01gQ';

    public constructor() {
        emailjs.init(this.publicKey);
    }

    public async inviaEmailContatti(nome: string, cognome: string, email: string, telefono: string, oggetto: string, messaggio: string, privacy_policy: boolean | string): Promise<any> {
        const params = {
            nome: nome,
            cognome: cognome,
            email: email,
            telefono: telefono,
            oggetto: oggetto,
            messaggio: messaggio,
            privacy_policy: privacy_policy
        }

        try {
            const result = await emailjs.send(this.serviceId, this.templateIdContatti, params);
            return result;
        } catch (error) {
            console.error('Errore nell\'invio dell\'email contatti:', error);
            throw error;
        }
    }

    public async inviaEmailPreventivo(nome: string, cognome: string, email: string, telefono: string, servizio: string, dettagli: string, privacy_policy: boolean | string): Promise<any> {
        const params = {
            nome: nome,
            cognome: cognome,
            email: email,
            telefono: telefono,
            servizio: servizio,
            dettagli: dettagli,
            privacy_policy: privacy_policy
        }

        try {
            const result = await emailjs.send(this.serviceId, this.templateIdPreventivo, params);
            return result;
        } catch (error) {
            console.error('Errore nell\'invio dell\'email preventivo:', error);
            throw error;
        }
    }
}