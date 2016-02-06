import {FrameworkConfigurationStub} from './FrameworkConfigurationStub';

export class AureliaStub {
  constructor() {
    this.use = new FrameworkConfigurationStub();
  }

  start() {
    return Promise.resolve();
  }
}
