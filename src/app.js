import {Endpoint} from 'aurelia-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import AppRouterConfig from './configuration/router-config';
import 'jquery';

System.import('popper').then(popper => {
  window.Popper = popper;
}).then(() => {
  System.import('bootstrap')
});

@inject(Router, Endpoint.of(), AppRouterConfig)
export class App {
  constructor(router, api, appRouterConfig) {
    this.router = router;
    this.api = api;
    this.appRouterConfig = appRouterConfig;
  }

  activate() {
    this.appRouterConfig.configure();
  }
}
