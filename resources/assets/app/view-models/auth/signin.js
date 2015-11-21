import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {Router} from 'aurelia-router';

import {Notification} from 'services/notification';

@inject(AuthService, Notification, Router)
export class Signin {
  username = '';
  password = '';

  loginError = '';

  constructor(auth, notification, router) {
    this.auth = auth;
    this.notification = notification;
    this.router = router;
  }

  signin() {
    let userInfo = { username: this.username, password: this.password };
    return this.auth.login(userInfo)
      .then(response => {
        this.notification.success('You signed in successfully.');
        this.router.navigate('/contents');
      })
      .catch(error => this.loginError = 'Your sign in credentials are wrong.');
  }
}
