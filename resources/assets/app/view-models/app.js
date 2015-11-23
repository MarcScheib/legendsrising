import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-auth';
import AppRouterConfig from '../configuration/router-config';
import 'jquery';
import 'twbs/bootstrap';

@inject(Router, FetchConfig, AppRouterConfig)
export class App {
  constructor(router, fetchConfig, appRouterConfig) {
    this.router = router;
    this.fetchConfig = fetchConfig;
    this.appRouterConfig = appRouterConfig;
  }

  activate() {
    this.fetchConfig.configure();
    this.appRouterConfig.configure();
  }
}
