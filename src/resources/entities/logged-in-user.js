import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {AuthService} from 'aurelia-authentication';

@inject(EventAggregator, AuthService)
export class LoggedInUser {
  isLoggedIn = false;

  constructor(eventAggregator, authService) {
    this.authService = authService;
    this.isLoggedIn = this.authService.isAuthenticated();
    this.eventAggregator = eventAggregator;
    this.eventAggregator.subscribe('authentication-change', this.authStateChanged.bind(this));
  }

  authStateChanged(authenticated) {
    this.isLoggedIn = authenticated;
  }
}
