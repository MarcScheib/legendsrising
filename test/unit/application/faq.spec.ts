import DoneCallback = jest.DoneCallback;

import { Container } from 'aurelia-framework';
import { Config } from 'aurelia-api';

import { setupApi } from '../fixtures/api-helper';
import { Index } from 'application/faq/index';

describe('the FAQ Index module', () => {
  let container: Container;
  let sut: Index;

  beforeEach(() => {
    container = new Container();
    setupApi(container);
    container.registerTransient(Index);
    sut = container.get(Index);
  });

  it('contains an entity manager property', () => {
    expect(sut.entityManager).toBeDefined();
  });

  it('fetches faqs', (done: DoneCallback) => {
    sut.activate()
      .then(() => {
        expect(sut.faqs).toBeDefined();
        expect(sut.faqs.length).toBeGreaterThan(0);
      })
      .then(done);
  });

  it('contains an empty list on api fail', done => {
    let apiConfig = container.get(Config);
    apiConfig.setDefaultEndpoint('apiFail');
    let sut = container.get(Index);
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
