const fs = require('fs');
const path = require('path');

const baseUrl = 'https://faustinicostruzioni.it';

// Struttura routes da Angular, da adattare se cambiano le rotte
const routes = [
  { path: 'home' },
  { path: 'chi-siamo' },
  {
    path: 'progetti', children: [
      { path: 'area-rupe' },
      { path: 'teatro-cecilia' },
      { path: 'viadotto-svenere' },
      { path: 'galleria-snicola' }
    ]
  },
  {
    path: 'servizi', children: [
      { path: 'costruzioni' },
      { path: 'lavori' },
      { path: 'idrodemolizioni' },
      { path: 'restauri' },
      { path: 'noleggio' }
    ]
  },
  { path: 'contatti' },
  { path: 'preventivo' },
  { path: 'pagina-non-trovata' }
];

// Helper: genera array di URL da routes annidate
function generateUrls(routes, parentPath = '') {
  let urls = [];

  routes.forEach(route => {
    if (route.path === '') return; // ignora redirect '' (root)

    const fullPath = parentPath + '/' + route.path;

    urls.push(fullPath);

    if (route.children) {
      urls = urls.concat(generateUrls(route.children, fullPath));
    }
  });

  return urls;
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function generateSitemap(urls) {
  const header = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  `;

  const footer = '</urlset>';

  const urlEntries = urls.map(url => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${getCurrentDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n');

  return header + urlEntries + '\n' + footer;
}

const urls = generateUrls(routes);
const sitemapContent = generateSitemap(urls);

const outputPath = path.join(__dirname, '..', 'src', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemapContent, 'utf8');
console.log(`Sitemap generata in ${outputPath}`);
