import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())
export class NewsService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getAll() {
    return this.apiClient
      .find('news', {
        '_expand': 'user'
      })
      .catch(error => Promise.reject(error));
  }

  get(id) {
    return this.apiClient
      .findOne('news', id, {
        '_expand': 'user'
      })
      .catch(error => Promise.reject(error));
  }
}
