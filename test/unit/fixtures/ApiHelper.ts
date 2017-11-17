import {Config} from 'aurelia-api';

export function setupApi(container) {
  let api = container.get(Config);
  api.registerEndpoint('apiFail', configure => {
    configure.withBaseUrl('http://localhost:3000/');
    configure.withInterceptor({
      request(request) {
        throw request;
      }
    });
  });
  api.registerEndpoint('api', 'http://localhost:3000/')
    .setDefaultEndpoint('api');
}
