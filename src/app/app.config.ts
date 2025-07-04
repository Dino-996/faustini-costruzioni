import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    /* Angular Fire configuration */
    provideFirebaseApp(() => initializeApp(
      {
        projectId: "faustinicostruzioni-b5930",
        appId: "1:410345993061:web:18102806084da64671e78c",
        storageBucket: "faustinicostruzioni-b5930.appspot.com",
        apiKey: "AIzaSyBLCzVYHXD2Db2Dp7ZnRj6gnMda-Ou6fGM",
        authDomain: "faustinicostruzioni-b5930.firebaseapp.com",
        messagingSenderId: "410345993061",
        measurementId: "G-KKM0YT53CD"
      })),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService, provideFirestore(() => getFirestore()),
    provideAppCheck(() => initializeAppCheck(getApp(), {
      provider: new ReCaptchaV3Provider('6LcFG8cpAAAAAEWyCrx4HMHNoaI2EIm4y5Qxe9cG')
    })),
  ]
};