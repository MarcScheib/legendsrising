import {bindable, inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';

import {UIState} from '../../services/UIState';

@inject(AuthService, UIState)
export class NavigationTop {
  @bindable router = null;

  constructor(auth, uiState) {
    this.auth = auth;
    this.uiState = uiState;
  }

  toggleSideNavigation() {
    this.uiState.toggleSideNavigation();
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
