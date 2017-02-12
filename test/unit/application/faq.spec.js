import {Index} from '../../../src/application/faq/index';

import {FaqServiceStub} from '../fixtures/FaqServiceStub';

describe('the FAQ Index module', () => {
  var faqService;
  var sut;

  var itemStubs = [{title: 'test'}];
  var itemFake = [2];

  beforeEach(() => {
    faqService = new FaqServiceStub();
    sut = new Index(faqService);
  });
});
