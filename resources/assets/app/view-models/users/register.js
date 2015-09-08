import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Validation, ensure} from 'aurelia-validation';

import {UserService} from 'services/users/user-service';
import {Notification} from 'services/notification';

@inject(Router, Validation, UserService, Notification)
export class Register {
    constructor(router, validation, userService, notification) {
        this.router = router;
        this.userService = userService;
        this.notification = notification;
        this.validation = validation.on(this)
            .ensure('username')
                .isNotEmpty()
                .hasLengthBetween(3, 25)
                .passes((newValue) => {
                // Todo: Simplify this?
                    return new Promise( (accept, reject) => {
                        this.userService.isUsernameExisting(newValue).then( response => {
                                if (response.content.exists) {
                                    reject('is already taken');
                                } else {
                                    accept();
                                }
                            }
                        )
                    })
                })
            .ensure('email')
                .isNotEmpty()
                .isEmail()
                .passes((newValue) => {
                // Todo: Simplify this?
                    return new Promise( (accept, reject) => {
                        this.userService.isEmailExisting(newValue).then( response => {
                                if (response.content.exists) {
                                    reject('is already taken');
                                } else {
                                    accept();
                                }
                            }
                        )
                    })
                })
            .ensure('password')
                .isNotEmpty()
                .hasMinLength(8)
                .isStrongPassword()
            .ensure('password_repeat', (config) => {
                config.computedFrom(['password'])
            })
                .isNotEmpty()
                .isEqualTo(() => {
                    return this.password
                }, 'the entered password');
    }

    register() {
        this.validation.validate().then(
            () => {
                let user = {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    password_repeat: this.password_repeat
                };

                this.userService.register(user).then(response => {
                    if (response.content.errors) {
                        this.notification.danger(response.content.message);
                    } else {
                        this.notification.success(response.content.message);
                        this.router.navigate('/users/signin');
                    }
                });
            }, () => {
                this.notification.danger('You have got errors in your registration.');
            }
        );
    }
}