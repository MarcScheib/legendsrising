import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())
export class NewsCommentsService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getRecent(id) {
    return this.apiClient.find('news/' + id + '/comments')
      .catch(error => Promise.reject(error));
  }
}
