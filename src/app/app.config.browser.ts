import { ApplicationConfig, isDevMode } from '@angular/core';
import { mergeApplicationConfig } from '@angular/core';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';

import { appConfig } from './app.config';

const getAppCheck = () => {
  if (isDevMode()) {
    (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = 'AA63943E-1AC2-4038-A444-48EADE61C7BB';
  }
  return initializeAppCheck(getApp(), {
    provider: new ReCaptchaV3Provider('6Lf683orAAAAAHW10dLEAF9J5PHO3nJpaedBNxyH'),
    isTokenAutoRefreshEnabled: true,
  });
};

const browserFirebaseConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp({
      projectId: 'faustinicostruzioni-b5930',
      appId: '1:410345993061:web:18102806084da64671e78c',
      storageBucket: 'faustinicostruzioni-b5930.appspot.com',
      apiKey: 'AIzaSyBLCzVYHXD2Db2Dp7ZnRj6gnMda-Ou6fGM',
      authDomain: 'faustinicostruzioni-b5930.firebaseapp.com',
      messagingSenderId: '410345993061',
      measurementId: 'G-KKM0YT53CD',
    })),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    // Firestore e AppCheck sono stati spostati in app.routes.ts per il lazy loading
  ]
};

export const browserConfig = mergeApplicationConfig(appConfig, browserFirebaseConfig);
