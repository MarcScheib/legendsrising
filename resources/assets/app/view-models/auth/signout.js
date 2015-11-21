import {inject} from 'aurelia-framework';
import {noView} from 'aurelia-templating';
import {AuthService} from 'aurelia-auth';
import {Router} from 'aurelia-router';

import {Notification} from 'services/notification';

@inject(AuthService, Notification, Router)
export class Signout {
  constructor(auth, notification, router) {
    this.auth = auth;
    this.notification = notification;
    this.router = router;
  }

  activate() {
    return this.auth.logout()
      .then(response => {
        this.notification.success("Signed out successfully");
        this.router.navigate('/auth/signin');
      })
      .catch(err => this.notification.error("Error signing out"));
  }
}