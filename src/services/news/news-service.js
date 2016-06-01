import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())
export class NewsService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getAll() {
    return this.apiClient.find('news')
      .catch(error => Promise.reject(error));
  }

  get(id) {
    return this.apiClient.find('news', id)
      .catch(error => Promise.reject(error));
  }
}
