import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';

@inject(HttpClient)
export default class {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  configure() {
    this.httpClient.configure(config => {
      config
        .withDefaults({
          headers: {
            'Accept': 'application/json'
          }
        })
        .withBaseUrl('http://lr.local/api')
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response; // you can return a modified Response
          }
        });
    });
  }
}
