import {inject} from 'aurelia-framework';
import {NotificationService} from 'aurelia-notify';
import {Router} from 'aurelia-router';
import {Validation} from 'aurelia-validation';

import {UserService} from '../../services/users/user-service';

@inject(Router, Validation, UserService, NotificationService)
export class SignUp {
  constructor(router, validation, userService, notification) {
    this.router = router;
    this.userService = userService;
    this.notification = notification;
    this.validation = validation.on(this)
      .ensure('username', (config) => {
        config.useDebounceTimeout(150);
      })
      .isNotEmpty()
      .hasLengthBetween(3, 25)
      .passes((newValue) => {
        return new Promise((accept, reject) => {
          this.userService.isUsernameExisting(newValue).then(data => {
            if (data.exists) {
              reject('is already taken');
            } else {
              accept();
            }
          });
        });
      })
      .ensure('email', (config) => {
        config.useDebounceTimeout(150);
      })
      .isNotEmpty()
      .isEmail()
      .passes((newValue) => {
        return new Promise((accept, reject) => {
          this.userService.isEmailExisting(newValue).then(data => {
            if (data.exists) {
              reject('is already taken');
            } else {
              accept();
            }
          });
        });
      })
      .ensure('password')
      .isNotEmpty()
      .hasLengthBetween(8, 32)
      .isStrongPassword()
      .ensure('password_repeat', (config) => {
        config.computedFrom(['password']);
      })
      .isNotEmpty()
      .isEqualTo(() => {
        return this.password;
      }, 'the entered password');
  }

  signUp() {
    this.validation.validate().then(
      () => {
        let user = {
          'username': this.username,
          'email': this.email,
          'password': this.password,
          'password_repeat': this.password_repeat
        };

        this.userService.signUp(user).then(data => {
          if (!data.id) {
            this.notification.danger('You have got errors in your sign up form.');
          } else {
            this.notification.success('You signed up successfully.');
            this.router.navigate('/auth/signin');
          }
        });
      },
      () => {
        this.notification.danger('You have got errors in your sign up form.');
      }
    );
  }
}
