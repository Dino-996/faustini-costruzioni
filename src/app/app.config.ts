import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyBLCzVYHXD2Db2Dp7ZnRj6gnMda-Ou6fGM",
  authDomain: "faustinicostruzioni-b5930.firebaseapp.com",
  projectId: "faustinicostruzioni-b5930",
  storageBucket: "faustinicostruzioni-b5930.appspot.com",
  messagingSenderId: "410345993061",
  appId: "1:410345993061:web:18102806084da64671e78c",
  measurementId: "G-KKM0YT53CD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
getAnalytics(app);

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcFG8cpAAAAAEWyCrx4HMHNoaI2EIm4y5Qxe9cG'),
  isTokenAutoRefreshEnabled: true
});

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
