import { inject } from 'aurelia-framework';
import { Endpoint, Rest } from 'aurelia-api';

@inject(Endpoint.of()) // TODO required new aurelia-api version with optional param
export class NewsCommentsService {
  constructor(private apiClient: Rest) {
    this.apiClient = apiClient;
  }

  getAll(newsId: number, page: number = 1) {
    return this.apiClient
      .find('news/' + newsId + '/comments', {
        '_page': page,
        '_expand': 'user'
      })
      .catch(error => Promise.reject(error));
  }

  add(newsId: number, comment: any) {
    return this.apiClient
      .create('news/' + newsId + '/comments', comment);
  }
}
