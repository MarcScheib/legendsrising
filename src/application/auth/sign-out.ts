import { autoinject } from 'aurelia-framework';
import { AuthService } from 'aurelia-authentication';
import { NotificationService } from 'aurelia-notify';

@autoinject()
export class SignOut {
  constructor(private auth: AuthService,
              private notification: NotificationService) {
  }

  activate() {
    return this.auth.logout()
      .then(response => {
        this.notification.success('You signed out successfully.');
      })
      .catch(err => {
        this.notification.danger('Error when signing you out.');
      });
  }
}
