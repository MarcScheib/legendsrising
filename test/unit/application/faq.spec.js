import {Index} from '../../../src/application/faq/index';
import {FaqServiceStub} from '../fixtures/FaqServiceStub';

describe('the FAQ Index module', () => {
  let faqService;
  let sut;

  let itemStubs = [{title: 'test'}];
  let itemFake = [2];

  beforeEach(() => {
    faqService = new FaqServiceStub();
    sut = new Index(faqService);
  });

  it('contains a faq service property', () => {
    expect(sut.faqService).toBeDefined();
  });

  it('sets fetch response to faqs', done => {
    faqService.itemStub = {data: itemStubs};
    sut.activate()
      .then(() => {
        expect(sut.faqs).toBe(itemStubs);
        expect(sut.faqs).not.toBe(itemFake);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('contains an empty list on api fail', done => {
    faqService.reject = true;
    sut.activate()
      .then(() => {
        expect(sut.faqs).toEqual([]);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
