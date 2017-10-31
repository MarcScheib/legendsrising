import { Endpoint } from 'aurelia-api';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import AppRouterConfig from './configuration/router-config';
//import 'jquery';
//import 'bootstrap';

@autoinject()
export class App {
  constructor(private router: Router,
              private api: Endpoint,
              private appRouterConfig: AppRouterConfig) {
  }

  activate() {
    this.appRouterConfig.configure();
  }
}
