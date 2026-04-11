import { bootstrapApplication } from '@angular/platform-browser';
import { browserConfig } from './app/app.config.browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, browserConfig)
  .catch((err) => console.error(err));
