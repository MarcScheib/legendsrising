import {inject} from 'aurelia-framework';
import {noView} from 'aurelia-templating';
import {AuthService} from 'aurelia-auth';

import {Notification} from 'services/notification';

@noView
@inject(AuthService, Notification)
export class Signout {
  constructor(auth, notification) {
    this.auth = auth;
    this.notification = notification;
  }

  activate() {
    this.auth.logout("/auth/signin")
      .then(response => this.notification.success("Signed out successfully"))
      .catch(err => this.notification.error("Error signing out"));
  }
}