import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())
export class NewsCommentsService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getAll(newsId, page = 1) {
    return this.apiClient.find('news/' + newsId + '/comments', {page: page})
      .catch(error => Promise.reject(error));
  }

  add(newsId, comment) {
    return this.apiClient.create('news/' + newsId + '/comments', comment);
  }
}
