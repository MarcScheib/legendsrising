import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig} from 'aurelia-auth';
import AppRouterConfig from '../configuration/router-config';
import AppFetchConfig from '../configuration/fetch-config';
import 'jquery';
import 'twbs/bootstrap';

@inject(Router, FetchConfig, AppRouterConfig, AppFetchConfig)
export class App {
  constructor(router, fetchConfig, appRouterConfig, appFetchConfig) {
    this.router = router;
    this.fetchConfig = fetchConfig;
    this.appRouterConfig = appRouterConfig;
    this.appFetchConfig = appFetchConfig;
  }

  activate() {
    this.fetchConfig.configure();
    this.appRouterConfig.configure();
    this.appFetchConfig.configure();
  }
}
