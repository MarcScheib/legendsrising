import { Container } from 'aurelia-framework';

import { RestStub } from '../fixtures/rest.stub';
import { Index } from 'application/faq/index';
import { FaqEntity } from 'resources/entities/faq-entity';

describe('the FAQ Index module', () => {
  let rest: RestStub;
  let sut: Index;

  beforeEach(() => {
    const container = new Container();
    rest = RestStub.createMock(container);
    sut = container.get(Index);
  });

  it('contains an entity manager property', () => {
    expect(sut.entityManager).toBeTruthy();
  });

  it('fetches FAQs', (done: jest.DoneCallback) => {
    rest.requestDummy = [new FaqEntity()];
    sut.activate()
      .then(() => {
        expect(sut.faqs).toBeDefined();
        expect(sut.faqs.length).toBeGreaterThan(0);
      })
      .catch(() => {
        expect(true).toBeFalsy();
      })
      .then(done);
  });

  it('contains an empty list on api fail', (done: jest.DoneCallback) => {
    rest.reject = true;
    sut.activate()
      .then(() => {
        expect(sut.faqs).toEqual([]);
      })
      .catch(() => {
        expect(true).toBeFalsy();
      })
      .then(done);
  });
});
