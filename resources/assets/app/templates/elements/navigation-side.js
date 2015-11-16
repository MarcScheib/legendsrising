import {bindable, inject} from 'aurelia-framework';
import {AuthService} from 'paulvanbladel/aurelia-auth';

@inject(AuthService)
export class NavigationSide {
  _isAuthenticated = false;
  @bindable router = null;

  constructor(auth) {
    this.auth = auth;
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
