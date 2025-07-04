export class Form {

    private input: string | boolean;

    public constructor(input: string | boolean) {
        this.input = input;
    }

    public formattaTesto() {
        const inputString = this.input as string;
        const index = inputString.search(/[A-Z]/);
        if (index > 0) {
            const first = inputString.slice(0, index); // Da 0 fino alla prima maiuscola
            const second = inputString.slice(index); // Dalla prima maiuscola in poi
            const formattedFirst = first[0].toUpperCase() + first.slice(1).toLowerCase();
            const formattedSecond = second[0].toLowerCase() + second.slice(1).toLowerCase();
            return formattedFirst + " " + formattedSecond;
        }
        return inputString[0].toUpperCase() + inputString.slice(1).toLowerCase();
    }

    public primaLetteraMaiuscola() {
        const inputString = this.input as string;
        return inputString[0].toUpperCase() + inputString.slice(1).toLowerCase();
    }

    public telefonoInserito(): string {
        const inputString = this.input as string;
        if (!inputString) {
            return 'Preferisco non dire';
        }
        return inputString;
    }

    public privacyPolicyAccettata(): string {
        const booleanInput = this.input as boolean;
        return booleanInput ? 'Accettata' : 'Non accettata';
    }

}