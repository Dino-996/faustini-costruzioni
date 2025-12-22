const fs = require('fs');
const path = require('path');

const baseUrl = 'https://faustinicostruzioni.it';
const companyName = 'Faustini Costruzioni S.r.l.';

// Struttura routes
const routes = [
    { path: 'home', desc: 'Pagina principale con panoramica aziendale.' },
    { path: 'chi-siamo', desc: 'Storia, missione e valori di Faustini Costruzioni.' },
    {
        path: 'progetti', desc: 'Portfolio lavori e opere realizzate.', children: [
            { path: 'area-rupe', desc: 'Intervento di consolidamento Area Rupe.' },
            { path: 'teatro-cecilia', desc: 'Lavori presso Teatro Cecilia.' },
            { path: 'viadotto-svenere', desc: 'Manutenzione e lavori Viadotto Svenere.' },
            { path: 'galleria-snicola', desc: 'Interventi in Galleria S. Nicola.' }
        ]
    },
    {
        path: 'servizi', desc: 'Servizi edili specializzati.', children: [
            { path: 'costruzioni', desc: 'Costruzioni civili e industriali.' },
            { path: 'lavori', desc: 'Lavori pubblici e scavi.' },
            { path: 'idrodemolizioni', desc: 'Tecnologie di idrodemolizione controllata.' },
            { path: 'restauri', desc: 'Restauro conservativo e risanamento.' },
            { path: 'noleggio', desc: 'Noleggio macchinari e attrezzature edili.' }
        ]
    },
    { path: 'contatti', desc: 'Informazioni di contatto e localizzazione sede.' },
    { path: 'preventivo', desc: 'Modulo per la richiesta di preventivi personalizzati.' }
];

// Funzione per generare la lista testuale delle pagine
function generateMarkdownList(routes, parentPath = '', level = 0) {
    let content = '';
    const indent = '  '.repeat(level);

    routes.forEach(route => {
        const fullPath = parentPath + '/' + route.path;
        const fullUrl = `${baseUrl}${fullPath}`;

        content += `${indent}- [${route.path}](${fullUrl}): ${route.desc || ''}\n`;

        if (route.children) {
            content += generateMarkdownList(route.children, fullPath, level + 1);
        }
    });

    return content;
}

function generateLLMSTxt(routes) {
    const header = `# ${companyName}\n\n`;
    const intro = `Benvenuti nel sito ufficiale di Faustini Costruzioni. Questa guida è ottimizzata per assistenti AI e descrive la struttura del sito e i servizi offerti.\n\n`;

    const sectionTitle = `## Struttura del Sito e Link\n\n`;
    const list = generateMarkdownList(routes);

    const instructions = `
## Istruzioni per l'AI
- Sede: Vietri di Potenza (PZ).
- Specializzazioni: Idrodemolizioni, Restauri, Grandi Opere, Noleggio.
- Per richieste commerciali o preventivi, indirizzare l'utente alla sezione /preventivo.
`;

    return header + intro + sectionTitle + list + instructions;
}

const llmsContent = generateLLMSTxt(routes);

const outputPath = path.join(__dirname, '..', 'src', 'llms.txt');
try {
    fs.writeFileSync(outputPath, llmsContent, 'utf8');
    console.log(`✅ File llms.txt generato con successo in: ${outputPath}`);
} catch (err) {
    console.error(`❌ Errore durante la scrittura del file: ${err}`);
}