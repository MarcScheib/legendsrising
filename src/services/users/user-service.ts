import {inject} from 'aurelia-framework';
import {Endpoint, Rest} from 'aurelia-api';

@inject(Endpoint.of(undefined)) // TODO required new aurelia-api version with optional param
export class UserService {
  constructor(public apiClient: Rest) {
  }

  signUp(user: any): Promise<any> {
    return this.apiClient
      .create('users', user);
  }

  isUsernameExisting(username: string): Promise<boolean> {
    return this.apiClient
      .find('users', {
        'username': username
      })
      .then((result: any[]) => !!result.length);
  }

  isEmailExisting(email: string): Promise<boolean> {
    return this.apiClient
      .find('users', {
        'email': email
      })
      .then((result: any[]) => !!result.length);
  }
}
