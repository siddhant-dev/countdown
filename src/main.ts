import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import {createCustomElement} from '@angular/elements';
import { enableProdMode } from '@angular/core';
import { CountdownTimerComponent } from './app/countdown-timer/countdown-timer.component';

enableProdMode();

bootstrapApplication(CountdownTimerComponent, appConfig).then((appRef) => {
  const customElement = createCustomElement(CountdownTimerComponent, {
      injector: appRef.injector,
    });
    customElements.define('countdown-timer', customElement);
})
  .catch((err) => console.error(err));
