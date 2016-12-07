import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {NotificationService} from 'aurelia-notify';
import {Router} from 'aurelia-router';
import {LoggedInUser} from '../../resources/entities/logged-in-user';

@inject(AuthService, NotificationService, Router, LoggedInUser)
export class SignIn {
  username = '';
  password = '';

  constructor(authService, notification, router, loggedInUser) {
    this.authService = authService;
    this.notification = notification;
    this.router = router;
    this.loggedInUser = loggedInUser;
  }

  signIn() {
    let userInfo = {username: this.username, password: this.password};
    return this.authService.login(userInfo)
      .then(() => this.authService.getMe())
      .then(user => {
        this.loggedInUser.user = user;
        this.notification.success('You signed in successfully.');
      })
      .catch(error => {
        if (error.status === 401) {
          this.notification.danger('Your sign in credentials are wrong.');
        } else {
          this.notification.danger('Your user data could not be loaded. Signing you out again.');
          this.authService.logout();
        }
      });
  }
}
