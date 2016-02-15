import {bindable, inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';

@inject(AuthService)
export class NavigationTop {
  @bindable router = null;

  constructor(auth) {
    this.auth = auth;
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated();
  }
}
