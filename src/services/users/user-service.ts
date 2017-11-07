import { inject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';

@inject(Endpoint.of(undefined)) // TODO required new aurelia-api version with optional param
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

  isUsernameExisting(username: string): Promise<boolean> {
    return this.apiClient
      .find('users', {
        'username': username
      })
      .then((result: { data: any[] }) => {
        return !!result.data.length;
      });
  }

  isEmailExisting(email: string): Promise<boolean> {
    return this.apiClient
      .find('users', {
        'email': email
      })
      .then((result: { data: any[] }) => {
        return !!result.data.length;
      });
  }
}
