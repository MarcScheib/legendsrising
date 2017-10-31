import { Endpoint } from 'aurelia-api';
import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, Router } from 'aurelia-router';

import AppRouterConfig from './configuration/router-config';

@autoinject()
export class App implements RoutableComponentActivate {
  constructor(private router: Router,
              private api: Endpoint,
              private appRouterConfig: AppRouterConfig) {
  }

  activate(): void {
    this.appRouterConfig.configure();
  }
}
