import { Container } from 'aurelia-framework';
import { Config } from 'aurelia-api';

export function setupApi(container: Container): void {
  const api: Config = container.get(Config);
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
