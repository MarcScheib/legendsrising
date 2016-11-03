import {bindable, inject} from 'aurelia-framework';

import {LoggedInUser} from '../entities/logged-in-user';

@inject(LoggedInUser)
export class NavigationTop {
  @bindable router = null;

  constructor(loggedInUser) {
    this.loggedInUser = loggedInUser;
  }
}
