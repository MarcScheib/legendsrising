import { autoinject, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import { LoggedInUser } from '../entities/logged-in-user';

@autoinject()
export class NavigationTop {
  @bindable router: Router = null;

  constructor(private loggedInUser: LoggedInUser) {
  }
}
