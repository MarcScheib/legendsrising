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
    return this.auth.login(this.email, this.password)
      .then(response => this.notification.success('You signed in successfully.'))
      .catch(error => this.loginError = error.response);
  }
}
