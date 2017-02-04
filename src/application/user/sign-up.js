import {inject, NewInstance} from "aurelia-framework";
import {NotificationService} from "aurelia-notify";
import {Router} from "aurelia-router";
import {ValidationController, ValidationRules, validateTrigger} from "aurelia-validation";
import {BootstrapFormRenderer} from "../../resources/validation/bootstrap-form-renderer";
import {UserService} from "../../services/users/user-service";

@inject(Router, NewInstance.of(ValidationController), UserService, NotificationService)
export class SignUp {
  constructor(router, validationController, userService, notification) {
    this.router = router;
    this.userService = userService;
    this.notification = notification;
    this.validationRenderer = new BootstrapFormRenderer();
    this.validationController = validationController;
    this.validationController.validateTrigger = validateTrigger.change;
    ValidationRules
      .ensure('username')
      .required()
      .minLength(3)
      .maxLength(25)
      .then()
      .satisfies(newValue => {
        return new Promise((accept, reject) => {
          this.userService.isUsernameExisting(newValue)
            .then(data => {
              if (data.exists) {
                accept(false);
              } else {
                accept(true);
              }
            })
            .catch(data => {
              this.notification.danger('There seems to be an issue with the user service. Please, try again.');
              accept(false);
            });
        });
      }).withMessage(`\${$displayName} is already taken.`)
      .ensure('email')
      .required()
      .email().withMessage('This is not a valid email address.')
      .then()
      .satisfies(newValue => {
        return new Promise((accept, reject) => {
          this.userService.isEmailExisting(newValue)
            .then(data => {
              if (data.exists) {
                accept(false);
              } else {
                accept(true);
              }
            })
            .catch(data => {
              this.notification.danger('There seems to be an issue with the user service. Please, try again.');
              accept(false);
            });
        });
      }).withMessage(`\${$displayName} is already taken.`)
      .ensure('password')
      .required()
      .minLength(8)
      .maxLength(32)
      .ensure('password_repeat').displayName('Password')
      .required()
      .satisfies(newValue => {
        return newValue === this.password;
      }).withMessage('Your chosen passwords must match each other.')
      .on(this);
  }

  activate() {
    this.validationController.addRenderer(this.validationRenderer);
  }

  deactivate() {
    this.validationController.removeRenderer(this.validationRenderer);
  }

  signUp() {
    this.validationController.validate()
      .then(result => {
        if (result.valid) {
          let user = {
            'username': this.username,
            'email': this.email,
            'password': this.password,
            'password_repeat': this.password_repeat
          };

          this.userService.signUp(user)
            .then(data => {
              if (!data.id) {
                this.notification.danger('You have got errors in your sign up form.');
              } else {
                this.notification.success('You signed up successfully.');
                this.router.navigate('/auth/signin');
              }
            })
            .catch(data => {
              this.notification.danger('The sign up process failed. Please try again.');
            });
        } else {
          this.notification.danger('You have got errors in your sign up form.');
        }
      });
  }
}
