/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { registerLicense } from '@syncfusion/ej2-base';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';


registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtfcHZVRGVfV0BxVks=');

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
