import { Routes } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
import { getApp } from '@angular/fire/app';
import { isDevMode } from '@angular/core';

const getAppCheckInstance = () => {
    if (isDevMode() && typeof window !== 'undefined') {
        (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = 'AA63943E-1AC2-4038-A444-48EADE61C7BB';
    }
    return initializeAppCheck(getApp(), {
        provider: new ReCaptchaV3Provider('6Lf683orAAAAAHW10dLEAF9J5PHO3nJpaedBNxyH'),
        isTokenAutoRefreshEnabled: true,
    });
};

export const routes: Routes = [

    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), data: { breadcrumb: 'Home Page' } },
    { path: 'chi-siamo', loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then(m => m.ChiSiamoComponent), data: { breadcrumb: 'Chi siamo' } },
    {
        path: 'progetti', loadComponent: () => import('./pages/progetti/progetti.component').then(m => m.ProgettiComponent), data: { breadcrumb: 'Progetti' },
        children: [
            { path: 'area-rupe', loadComponent: () => import('./pages/subpages/area-rupe/area-rupe.component').then(m => m.AreaRupeComponent), data: { breadcrumb: 'Area Rupe di Vietri di Potenza' } },
            { path: 'teatro-cecilia', loadComponent: () => import('./pages/subpages/teatro-cecilia/teatro-cecilia.component').then(m => m.TeatroCeciliaComponent), data: { breadcrumb: 'Centro per la creativita\' Cecilia di Tito' } },
            { path: 'viadotto-svenere', loadComponent: () => import('./pages/subpages/viadotto-santa-venere/viadotto-santa-venere.component').then(m => m.ViadottoSantaVenereComponent), data: { breadcrumb: 'Risanamento locale del viadotto S.Venere I e II R.A n.5 Sicignano - Potenza' } },
            { path: 'galleria-snicola', loadComponent: () => import('./pages/subpages/galleria-san-nicola/galleria-san-nicola.component').then(m => m.GalleriaSanNicolaComponent), data: { breadcrumb: 'Manutenzione straordinaria nella galleria S.Nicola SS 658 Potenza - Melfi' } },
        ]
    },
    {
        path: 'servizi', loadComponent: () => import('./pages/servizi/servizi.component').then(m => m.ServiziComponent), data: { breadcrumb: 'Servizi' },
        children: [
            { path: 'costruzioni', loadComponent: () => import('./pages/subpages/costruzioni/costruzioni.component').then(m => m.CostruzioniComponent), data: { breadcrumb: 'Costruzioni generali' } },
            { path: 'lavori', loadComponent: () => import('./pages/subpages/lavori/lavori.component').then(m => m.LavoriComponent), data: { breadcrumb: 'Lavori edili e stradali' } },
            { path: 'idrodemolizioni', loadComponent: () => import('./pages/subpages/idrodemolizioni/idrodemolizioni.component').then(m => m.IdrodemolizioniComponent), data: { breadcrumb: 'Idrodemolizioni' } },
            { path: 'restauri', loadComponent: () => import('./pages/subpages/restauri/restauri.component').then(m => m.RestauriComponent), data: { breadcrumb: 'Restauro conservativo' } },
            { path: 'noleggio', loadComponent: () => import('./pages/subpages/noleggi/noleggi.component').then(m => m.NoleggiComponent), data: { breadcrumb: 'Noleggio ponteggie e attrezzature' } },
        ]
    },
    { 
        path: 'contatti', 
        loadComponent: () => import('./pages/contatti/contatti.component').then(m => m.ContattiComponent), 
        data: { breadcrumb: 'Contatti' },
        providers: [
            provideFirestore(() => getFirestore()),
            provideAppCheck(() => getAppCheckInstance())
        ]
    },
    { 
        path: 'preventivo', 
        loadComponent: () => import('./pages/preventivo/preventivo.component').then(m => m.PreventivoComponent), 
        data: { breadcrumb: 'Preventivo' },
        providers: [
            provideFirestore(() => getFirestore()),
            provideAppCheck(() => getAppCheckInstance())
        ]
    },
    { path: '**', loadComponent: () => import('./components/pagina-non-trovata/pagina-non-trovata.component').then(m => m.PaginaNonTrovataComponent) }
];

