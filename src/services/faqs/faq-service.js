import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of())
export class FaqService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  get() {
    return this.apiClient
      .find('faqs')
      .catch(error => Promise.reject(error));
  }
}
