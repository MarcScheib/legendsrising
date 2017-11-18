import { Container } from 'aurelia-framework';
import { Config, Rest } from 'aurelia-api';

import { setupApi } from '../fixtures/api-helper';
import { RestStub } from '../fixtures/rest.stub';
import { Index } from 'application/faq/index';
import { EntityManager } from '../../../src/resources/features/persistence/entity-manager';

describe('the FAQ Index module', () => {
  let rest: RestStub;
  let sut: Index;

  beforeEach(() => {
    const container = new Container();
    container.registerSingleton(Rest, RestStub);
    rest = container.get(Rest);
    sut = container.get(Index);
  });

  it('contains an entity manager property', () => {
    expect(sut.entityManager).toBeTruthy();
  });

  it('fetches faqs', (done: jest.DoneCallback) => {
    sut.activate()
      .then(() => {
        expect(sut.faqs).toBeDefined();
        expect(sut.faqs.length).toBeGreaterThan(0);
      })
      .then(done);
  });

  it('contains an empty list on api fail', (done: jest.DoneCallback) => {
    const apiConfig = container.get(Config);
    apiConfig.setDefaultEndpoint('apiFail');
    const sut = container.get(Index);
    sut.activate()
      .then(() => {
        expect(sut.faqs).toEqual([]);
      })
      .catch(result => {
        expect(result).not.toBe(result);
      })
      .then(done);
  });
});
