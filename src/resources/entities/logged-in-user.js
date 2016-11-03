import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from 'aurelia-authentication';

@inject(EventAggregator, AuthService)
export class LoggedInUser {
  isLoggedIn = false;
  user = {};

  constructor(eventAggregator, authService) {
    this.authService = authService;
    this.isLoggedIn = this.authService.isAuthenticated();
    this.eventAggregator = eventAggregator;
    this.eventAggregator.subscribe('authentication-change', this.authStateChanged.bind(this));

    // Fetch logged in user data on object construction,
    // user may already be logged in but browser refresh
    // cleared up all data. Normally, this is set from
    // sign-in.js view model.
    if (this.isLoggedIn === true) {
      this.authService.getMe()
        .then(user => {
          this.user = user;
        })
        .catch(error => {
          // TODO: add logger
        });
    }
  }

  authStateChanged(authenticated) {
    this.isLoggedIn = authenticated;
    if (authenticated === false) {
      this.user = {};
    }
  }
}
