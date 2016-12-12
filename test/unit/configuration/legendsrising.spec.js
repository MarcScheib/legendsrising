import {ViewLocator} from 'aurelia-framework';
import {configure} from '../../../src/legendsrising';
import {AureliaStub} from '../fixtures/AureliaStub';

describe('the app configuration', () => {
  it('configures aurelia', done => {
    let aurelia = new AureliaStub();

    configure(aurelia).then(() => {
      expect(aurelia.use.info).toContain('aurelia-templating-binding');
      expect(aurelia.use.info).toContain('aurelia-templating-resources');
      expect(aurelia.use.info).toContain('aurelia-history-browser');
      expect(aurelia.use.info).toContain('aurelia-templating-router');
      expect(aurelia.use.info).toContain('aurelia-event-aggregator');
      expect(aurelia.use.info).toContain('aurelia-validation');
      expect(aurelia.use.info).toContain('aurelia-animator-css');
      expect(aurelia.use.info).toContain('aurelia-authentication');
      done();
    });
  });
});
