import { Container } from 'aurelia-framework';
import { Config, Rest } from 'aurelia-api';
import { RestStub } from './rest.stub';
import { PersistenceConfiguration } from 'resources/features/persistence/persistence-configuration';
import { PersistenceUnit } from 'resources/features/persistence/persistence-unit';

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

export function getRestMock(container: Container): RestStub {
  container.registerSingleton(Rest, RestStub);
  const config = new PersistenceConfiguration();
  config.client = container.get(Rest);
  container.registerInstance(PersistenceUnit, new PersistenceUnit(container, config));
  return container.get(Rest);
}
