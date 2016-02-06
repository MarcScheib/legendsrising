import {ViewLocator} from 'aurelia-framework';

import {configure} from '../../../src/configuration/legendsrising';

import {AureliaStub} from '../fixtures/AureliaStub';

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

  it('configures aurelia', () => {
    let aurelia = new AureliaStub();
    configure(aurelia);

    expect(aurelia.use.info).toContain('aurelia-templating-binding');
    expect(aurelia.use.info).toContain('aurelia-templating-resources');
    expect(aurelia.use.info).toContain('aurelia-history-browser');
    expect(aurelia.use.info).toContain('aurelia-templating-router');
    expect(aurelia.use.info).toContain('aurelia-event-aggregator');
    expect(aurelia.use.info).toContain('aurelia-validation');
    expect(aurelia.use.info).toContain('aurelia-animator-css');
    expect(aurelia.use.info).toContain('aurelia-auth');
  });
});
