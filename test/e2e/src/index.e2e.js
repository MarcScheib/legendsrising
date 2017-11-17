import {PageObjectSkeleton} from './skeleton.po.js';

describe('LegendsRising app', function() {
  let poSkeleton;

  beforeEach(() => {
    poSkeleton = new PageObjectSkeleton();

    browser.loadAndWaitForApp('http://localhost:9000');
  });

  it('should load the page and display the initial page title', () => {
    expect(poSkeleton.getCurrentPageTitle()).toBe('Welcome | LegendsRising');
  });
});
