const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

const run = async () => {
    console.log('Inizio ottimizzazione immagini...');
    
    // Trova tutte le immagini .webp in assets (incluse quelle dei progetti)
    const files = glob.sync('src/assets/**/*.webp');
    console.log(`Trovate ${files.length} immagini. Elaborazione in corso...`);
    
    for (const file of files) {
        const stats = fs.statSync(file);
        const buffer = fs.readFileSync(file);
        const img = sharp(buffer);
        const metadata = await img.metadata();
        
        let needsResize = false;
        let pOptions = { width: metadata.width }; 
        
        // Hero: max 1920px
        if (file.includes('hero') && metadata.width > 1920) {
            needsResize = true;
            pOptions.width = 1920; 
        } 
        // Altre immagini (progetti, servizi): max 1400px (sufficiente per fullscreen)
        else if (metadata.width > 1400) {
            needsResize = true;
            pOptions.width = 1400;
        }

        try {
            const outBuffer = await img
                .resize({ width: pOptions.width, withoutEnlargement: true })
                .webp({ quality: 75, effort: 6 }) // Qualità ottimale e massimo sforzo compressione
                .toBuffer();
                
            if (outBuffer.length < stats.size || needsResize) {
                fs.writeFileSync(file, outBuffer);
                const savings = ((stats.size - outBuffer.length) / 1024).toFixed(2);
                console.log(`✅ Ottimizzato: ${path.basename(file)} | Risparmio: ${savings}KB | Nuova dim: ${(outBuffer.length / 1024).toFixed(2)}KB`);
            } else {
                console.log(`ℹ️ Saltato (già ottimizzato): ${path.basename(file)}`);
            }
        } catch (error) {
            console.error(`❌ Errore in ${file}:`, error);
        }
    }
    
    console.log('✅ Ottimizzazione completata.');
};

run().catch(console.error);
