import { Container } from 'aurelia-framework';

import { RestStub } from '../fixtures/rest.stub';
import { Index } from 'application/faq/index';
import { getRestMock } from '../fixtures/api-helper';
import { FaqEntity } from 'resources/entities/faq-entity';

describe('the FAQ Index module', () => {
  let rest: RestStub;
  let sut: Index;

  beforeEach(() => {
    const container = new Container();
    rest = getRestMock(container);
    sut = container.get(Index);
  });

  it('contains an entity manager property', () => {
    expect(sut.entityManager).toBeTruthy();
  });

  it('fetches faqs', (done: jest.DoneCallback) => {
    rest.requestDummy = [new FaqEntity()];
    sut.activate()
      .then(() => {
        expect(sut.faqs).toBeDefined();
        expect(sut.faqs.length).toBeGreaterThan(0);
      })
      .then(done);
  });

  it('contains an empty list on api fail', (done: jest.DoneCallback) => {
    rest.reject = true;
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
