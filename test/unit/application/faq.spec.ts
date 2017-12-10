import {Container} from 'aurelia-framework';

import {RestStub} from '../fixtures/rest.stub';
import {Index} from 'application/faq/index';
import {FaqEntity} from 'resources/entities/faq-entity';

describe('FAQ', () => {
  describe('Index', () => {
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

    it('fetches FAQs', async () => {
      rest.requestDummy = [new FaqEntity()];
      await sut.activate();
      expect(sut.faqs).toBeDefined();
      expect(sut.faqs.length).toBeGreaterThan(0);
    });

    it('contains an empty list on api fail', async () => {
      rest.reject = true;
      await sut.activate();
      expect(sut.faqs).toEqual([]);
    });
  });
});
