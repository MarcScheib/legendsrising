import {activationStrategy} from 'aurelia-router';

import {Index} from '../../../src/application/page/index';

import {NavModelStub} from '../fixtures/NavModelStub';

describe('the Pages Index module', () => {
  var sut;

  beforeEach(() => {
    sut = new Index();
  });

  it('uses the replace activation strategy', () => {
    expect(sut.determineActivationStrategy()).toEqual(activationStrategy.replace);
  });

  it('determines the correct view via a view strategy', () => {
    sut.view = 'index';
    expect(sut.getViewStrategy()).toEqual('views/pages/index.html');
  });

  it('specifies the correct view and title via model activation', () => {
    let navModelStub = new NavModelStub();
    sut.activate({view: 'legalNotice'}, {navModel: navModelStub});

    expect(sut.view).toEqual('legal-notice');
    expect(navModelStub.title).toEqual('Legal Notice');
  });
});
