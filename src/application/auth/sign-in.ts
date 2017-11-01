import { autoinject } from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';
import { NotificationService } from 'aurelia-notify';
import { LoggedInUser } from '../../resources/entities/logged-in-user';

@autoinject()
export class SignIn {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private notification: NotificationService,
              private loggedInUser: LoggedInUser) {
  }

  signIn() {
    const userInfo = {username: this.username, password: this.password};
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
          this.notification.danger('Your user data could not be loaded. Please try signing in again.');
          this.authService.logout();
        }
      });
  }
}
