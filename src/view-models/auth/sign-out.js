import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {NotificationService} from 'aurelia-notification';
import {Router} from 'aurelia-router';

@inject(AuthService, NotificationService, Router)
export class SignOut {
  constructor(auth, notification, router) {
    this.auth = auth;
    this.notification = notification;
    this.router = router;
  }

  activate() {
    return this.auth.logout()
      .then(response => {
        this.notification.success('You signed out successfully');
      })
      .catch(err => {
        this.notification.danger('Error signing out');
      });
  }
}
