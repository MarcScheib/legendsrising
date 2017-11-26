import { Container } from 'aurelia-framework';
import { Rest } from 'aurelia-api';

import { PersistenceConfiguration } from 'resources/features/persistence/persistence-configuration';
import { PersistenceUnit } from 'resources/features/persistence/persistence-unit';

export class RestStub extends Rest {
  path: string;
  body: {};

  requestDummy: any;
  reject: boolean = false;

  static createMock(container: Container): RestStub {
    container.registerSingleton(Rest, RestStub);
    const config = new PersistenceConfiguration();
    config.client = container.get(Rest);
    container.registerInstance(PersistenceUnit, new PersistenceUnit(container, config));
    return container.get(Rest);
  }

  request(method: string, path: string, body?: {}, options?: {}): Promise<any | Error> {
    this.path = path;
    this.body = body;

    return new Promise((resolve: (value?: any) => void, reject: () => void) => {
      if (this.reject === false) {
        resolve(this.requestDummy);
      } else {
        reject();
      }
    });
  }
}
