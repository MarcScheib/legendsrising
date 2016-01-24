import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())
export class ProfileService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  get(id) {
    console.log(this.apiClient);
    return this.apiClient.find('profile', id);
  }
}
