import {inject, NewInstance} from 'aurelia-framework';
import {NotificationService} from 'aurelia-notify';
import {RoutableComponentActivate, RoutableComponentDeactivate, Router} from 'aurelia-router';
import {ControllerValidateResult, validateTrigger, ValidationController, ValidationRules} from 'aurelia-validation';

import {BootstrapFormRenderer} from 'resources/validation/bootstrap-form-renderer';
import {UserService} from 'services/users/user-service';
import {UserEntity} from 'resources/entities/user-entity';

@inject(Router, NewInstance.of(ValidationController), UserService, NotificationService)
export class SignUp implements RoutableComponentActivate, RoutableComponentDeactivate {
  validationRenderer: BootstrapFormRenderer;
  username: string;
  email: string;
  password_repeat: string;
  password: string;

  constructor(private router: Router,
              private validationController: ValidationController,
              private userService: UserService,
              private notification: NotificationService) {
    this.validationRenderer = new BootstrapFormRenderer();
    this.validationController.validateTrigger = validateTrigger.change;
    ValidationRules
      .ensure('username')
      .required()
      .minLength(3)
      .maxLength(25)
      .then()
      .satisfies((newValue: string) => this._checkExistence(() => this.userService.isUsernameExisting(newValue)))
      .withMessage(`\${$displayName} is already taken.`)
      .ensure('email')
      .required()
      .email().withMessage('This is not a valid email address.')
      .then()
      .satisfies((newValue: string) => this._checkExistence(() => this.userService.isEmailExisting(newValue)))
      .withMessage(`\${$displayName} is already taken.`)
      .ensure('password')
      .required()
      .minLength(8)
      .maxLength(32)
      .ensure('password_repeat').displayName('Password')
      .required()
      .satisfies((newValue: string) => {
        return newValue === this.password;
      }).withMessage('Your chosen passwords must match each other.')
      .on(this);
  }

  private _checkExistence(existenceFn: () => Promise<boolean>): Promise<boolean> {
    return new Promise<boolean>((resolve: (value?: boolean) => void) => {
      existenceFn()
        .then((existing: boolean) => {
          if (existing) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(() => {
          this.notification.danger('There seems to be an issue with the user service. Please, try again.');
          resolve(false);
        });
    });
  }

  activate(): void {
    this.validationController.addRenderer(this.validationRenderer);
  }

  deactivate(): void {
    this.validationController.removeRenderer(this.validationRenderer);
  }

  signUp(): void {
    this.validationController.validate()
      .then((result: ControllerValidateResult) => {
        if (result.valid) {
          const user = {
            'username': this.username,
            'email': this.email,
            'password': this.password,
            'password_repeat': this.password_repeat
          };

          this.userService.signUp(user)
            .then((data: UserEntity) => {
              if (!data.id) {
                this.notification.danger('You have got errors in your sign up form.');
              } else {
                this.notification.success('You signed up successfully.');
                this.router.navigate('/auth/signin');
              }
            })
            .catch(() => {
              this.notification.danger('The sign up process failed. Please try again.');
            });
        } else {
          this.notification.danger('You have got errors in your sign up form.');
        }
      });
  }
}
