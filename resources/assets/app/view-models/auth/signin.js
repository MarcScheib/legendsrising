import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';

import {Notification} from 'services/notification';

@inject(AuthService, Notification)
export class Signin {
  username = '';
  password = '';

  loginError = '';


  constructor(auth, notification) {
    this.auth = auth;
    this.notification = notification;
  }

  signin() {
    let userInfo = { username: this.username, password: this.password };
    return this.auth.login(userInfo)
      .then(response => this.notification.success('You signed in successfully.'))
      .catch(error => this.loginError = 'Your sign in credentials are wrong.');
  }
}
