import {Container} from 'aurelia-framework';
import {Config} from 'aurelia-api';
import {Index} from '../../../src/application/faq/index';

describe('the FAQ Index module', () => {
  let sut;

  let itemStubs = [{title: 'test'}];
  let itemFake = [2];

  beforeEach(() => {
    let container = new Container();
    let api = container.get(Config);
    api.registerEndpoint('api', 'http://localhost:3000/')
      .setDefaultEndpoint('api');
    sut = container.get(Index);
  });

  it('contains an entity manager property', () => {
    expect(sut.entityManager).toBeDefined();
  });

  it('fetches faqs', done => {
    sut.activate()
      .then(() => {
        expect(sut.faqs).toBeDefined();
        expect(sut.faqs.length).toBeGreaterThan(0);
      })
      .then(done);
  });

  // TODO: make api fail in tests
  xit('contains an empty list on api fail', done => {
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
