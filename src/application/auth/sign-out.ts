import {autoinject} from 'aurelia-framework';
import {RoutableComponentActivate} from 'aurelia-router';
import {AuthService} from 'aurelia-authentication';
import {NotificationService} from 'aurelia-notify';

@autoinject()
export class SignOut implements RoutableComponentActivate {
  constructor(private auth: AuthService,
              private notification: NotificationService) {
  }

  activate(): Promise<void> {
    return this.auth.logout()
      .then(() => {
        this.notification.success('You signed out successfully.');
      })
      .catch(() => {
        this.notification.danger('Error when signing you out.');
      });
  }
}
