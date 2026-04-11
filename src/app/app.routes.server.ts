import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Home usa immagini dinamiche (ngSrc + fill) — CSR per evitare timeout SSR
  { path: 'home', renderMode: RenderMode.Client },
  { path: '', renderMode: RenderMode.Client },
  // Form Firebase: CSR
  { path: 'contatti', renderMode: RenderMode.Client },
  { path: 'preventivo', renderMode: RenderMode.Client },
  // Prerendering statico: SSR
  { path: '**', renderMode: RenderMode.Prerender },
];
