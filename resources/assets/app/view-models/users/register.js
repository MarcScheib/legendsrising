import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Validation} from 'aurelia-validation';

import {UserService} from 'services/users/user-service';
import {Notification} from 'services/notification';

@inject(Router, Validation, UserService, Notification)
export class Register {
    constructor(router, validation, userService, notification) {
        this.router = router;
        this.userService = userService;
        this.notification = notification;
        this.validation = validation.on(this)
            .ensure('username', (config) => { config.useDebounceTimeout(150) })
                .isNotEmpty()
                .hasLengthBetween(3, 25)
                .passes((newValue) => {
                // Todo: Simplify this?
                    return new Promise( (accept, reject) => {
                        this.userService.isUsernameExisting(newValue).then(data => {
                                if (data.length != 0) {
                                    reject('is already taken');
                                } else {
                                    accept();
                                }
                            }
                        )
                    })
                })
            .ensure('email', (config) => { config.useDebounceTimeout(150) })
                .isNotEmpty()
                .isEmail()
                .passes((newValue) => {
                // Todo: Simplify this?
                    return new Promise( (accept, reject) => {
                        this.userService.isEmailExisting(newValue).then(data => {
                                if (data.length != 0) {
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
                .hasLengthBetween(8, 32)
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
                    "username": this.username,
                    "email": this.email,
                    "password": this.password,
                    "password_repeat": this.password_repeat
                };

                this.userService.register(user).then(data => {
                    if (!data.id) {
                        this.notification.danger('You have got errors in your registration.');
                    } else {
                        this.notification.success('You have been registered successfully.');
                        this.router.navigate('/users/signin');
                    }
                });
            }, () => {
                this.notification.danger('You have got errors in your registration.');
            }
        );
    }
}