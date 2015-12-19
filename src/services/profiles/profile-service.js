import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class ProfileService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  get(id) {
    return this.httpClient.fetch('/profile/' + id)
      .then(response => response.json());
  }
}
