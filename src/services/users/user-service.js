import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())
export class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  signUp(user) {
    return this.apiClient.create('user', user);
  }

  isUsernameExisting(username) {
    return this.apiClient.find('user/usernameexist', username);
  }

  isEmailExisting(email) {
    return this.apiClient.find('user/emailexist', email);
  }
}
