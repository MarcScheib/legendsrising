import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())
export class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  get(id) {
    return this.apiClient
      .find('users', id);
  }

  signUp(user) {
    return this.apiClient
      .create('users', user);
  }

  isUsernameExisting(username) {
    return this.apiClient
      .find('users', {
        'username': username
      })
      .then(result => {
        return result.data.length;
      });
  }

  isEmailExisting(email) {
    return this.apiClient
      .find('users', {
        'email': email
      })
      .then(result => {
        return result.data.length;
      });
  }
}
