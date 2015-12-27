import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class UserService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  signUp(user) {
    return this.httpClient.fetch('/user', {
      method: 'post',
      body: json(user)
    })
      .then(response => response.json());
  }

  isUsernameExisting(username) {
    return this.httpClient.fetch('/user/usernameexist/' + username)
      .then(response => response.json());
  }

  isEmailExisting(email) {
    return this.httpClient.fetch('/user/emailexist/' + email)
      .then(response => response.json());
  }
}
