import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import AppRouterConfig from '../configuration/router-config';
import 'jquery';
import 'twbs/bootstrap';

@inject(Router, AppRouterConfig)
export class App {
  constructor(router, appRouterConfig) {
    this.router = router;
    this.appRouterConfig = appRouterConfig;
  }

  activate() {
    this.appRouterConfig.configure();
  }
}
