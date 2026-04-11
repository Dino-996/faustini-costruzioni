const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

const run = async () => {
    console.log('Inizio ottimizzazione immagini...');
    
    // Trova tutte le immagini .webp
    const files = glob.sync('src/assets/image/**/*.webp');
    console.log(`Trovate ${files.length} immagini. Elaborazione in corso...`);
    
    for (const file of files) {
        const stats = fs.statSync(file);
        const buffer = fs.readFileSync(file);
        const img = sharp(buffer);
        const metadata = await img.metadata();
        
        let needsResize = false;
        let pOptions = { width: metadata.width }; 
        
        if (file.includes('hero-') && metadata.width > 1920) {
            needsResize = true;
            pOptions.width = 1920; 
        } else if (metadata.width > 1200 && !file.includes('hero-')) {
            needsResize = true;
            pOptions.width = 1200;
        }

        try {
            const outBuffer = await img
                .resize({ width: pOptions.width, withoutEnlargement: true })
                .webp({ quality: 80 })
                .toBuffer();
                
            if (outBuffer.length < stats.size || needsResize) {
                fs.writeFileSync(file, outBuffer);
                console.log(`✅ Ottimizzato: ${path.basename(file)} | Da: ${(stats.size / 1024 / 1024).toFixed(2)}MB -> a ${(outBuffer.length / 1024 / 1024).toFixed(2)}MB`);
            } else {
                console.log(`ℹ️ Saltato (non migliorabile): ${path.basename(file)}`);
            }
        } catch (error) {
            console.error(`❌ Errore in ${file}:`, error);
        }
    }
    
    console.log('✅ Ottimizzazione completata.');
};

run().catch(console.error);
