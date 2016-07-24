import {Endpoint} from 'aurelia-api';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {DOM} from 'aurelia-pal';

import AppRouterConfig from './configuration/router-config';
import {UIState} from './services/UIState';
import 'jquery';
import 'bootstrap';

@inject(Router, Endpoint.of(), AppRouterConfig, UIState)
export class App {
  showNavigationEvent = () => {
    if (window.innerWidth < 1200) {
      this.uiState.hideSideNavigation();
    } else {
      this.uiState.showSideNavigation();
    }
  };

  constructor(router, api, appRouterConfig, uiState) {
    this.router = router;
    this.api = api;
    this.appRouterConfig = appRouterConfig;
    this.uiState = uiState;
  }

  activate() {
    this.appRouterConfig.configure();
    window.addEventListener('resize', this.showNavigationEvent);
  }

  deactivate() {
    window.removeEventListener('resize', this.showNavigationEvent);
  }
}
