import {ViewLocator} from 'aurelia-framework';

import {configure} from '../../../src/configuration/legendsrising';

describe('the app configuration', () => {
  it('adjust the view view-model locations with js extension', () => {
    let origin = {
      moduleId: 'view-models/test.js'
    };
    let viewLocation = ViewLocator.prototype.convertOriginToViewUrl(origin);
    expect(viewLocation).toEqual('views/test.html');
  });

  it('adjust the view view-model locations with ts extension', () => {
    let origin = {
      moduleId: 'view-models/test.ts'
    };
    let viewLocation = ViewLocator.prototype.convertOriginToViewUrl(origin);
    expect(viewLocation).toEqual('views/test.html');
  });

  it('adjust the view view-model locations', () => {
    let origin = {
      moduleId: 'view-models/test'
    };
    let viewLocation = ViewLocator.prototype.convertOriginToViewUrl(origin);
    expect(viewLocation).toEqual('views/test.html');
  });
});
