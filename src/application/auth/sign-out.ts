import { AuthService } from 'aurelia-authentication';
import { inject } from 'aurelia-framework';
import { NotificationService } from 'aurelia-notify';

@inject(AuthService, NotificationService)
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
