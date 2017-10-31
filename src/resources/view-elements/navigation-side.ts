import { autoinject, bindable } from 'aurelia-framework';

import { LoggedInUser } from '../entities/logged-in-user';

@autoinject()
export class NavigationSide {
  @bindable router = null;

  constructor(private loggedInUser: LoggedInUser) {
  }
}
