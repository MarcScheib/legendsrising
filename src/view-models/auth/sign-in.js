import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {NotificationService} from 'aurelia-notify';
import {Router} from 'aurelia-router';

@inject(AuthService, NotificationService, Router)
export class SignIn {
  username = '';
  password = '';

  constructor(auth, notification, router) {
    this.auth = auth;
    this.notification = notification;
    this.router = router;
  }

  signIn() {
    let userInfo = { username: this.username, password: this.password };
    return this.auth.login(userInfo)
      .then(response => {
        this.notification.success('You signed in successfully.');
      })
      .catch(error => {
        this.notification.danger('Your sign in credentials are wrong.');
      });
  }
}
