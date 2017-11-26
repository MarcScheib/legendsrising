import { Aurelia } from 'aurelia-framework';

import { FrameworkConfigurationStub } from './framework-configuration.stub';

export class AureliaStub extends Aurelia {
  use: FrameworkConfigurationStub;

  constructor() {
    super();
    this.use = new FrameworkConfigurationStub(this);
  }

  start(): Promise<Aurelia> {
    return Promise.resolve(this);
  }
}
