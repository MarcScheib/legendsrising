import { activationStrategy } from 'aurelia-router';

import { Index } from 'application/page/index';

import { RouteConfigStub } from '../fixtures/route-config.stub';

describe('Pages', () => {
  describe('Index', () => {
    let sut: Index;

    beforeEach(() => {
      sut = new Index();
    });

    it('uses the replace activation strategy', () => {
      expect(sut.determineActivationStrategy()).toEqual(activationStrategy.replace);
    });

    it('determines the correct view via a view strategy', () => {
      sut.view = 'story';
      expect(sut.getViewStrategy()).toEqual('application/page/story.html');
    });

    it('specifies the correct view and title via model activation', () => {
      const routeConfig = new RouteConfigStub();
      sut.activate({view: 'legalNotice'}, routeConfig);

      expect(sut.view).toEqual('legal-notice');
      expect(routeConfig.navModel.title).toEqual('Legal Notice');
    });
  });
});
