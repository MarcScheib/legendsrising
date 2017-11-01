import { inject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';

@inject(Endpoint.of()) // TODO required new aurelia-api version with optional param
export class UserService {
  constructor(private apiClient: Rest) {
  }

  get(id: number) {
    return this.apiClient
      .find('users', id);
  }

  signUp(user: any) {
    return this.apiClient
      .create('users', user);
  }

  isUsernameExisting(username: string) {
    return this.apiClient
      .find('users', {
        'username': username
      })
      .then(result => {
        return result.data.length;
      });
  }

  isEmailExisting(email: string) {
    return this.apiClient
      .find('users', {
        'email': email
      })
      .then(result => {
        return result.data.length;
      });
  }
}
