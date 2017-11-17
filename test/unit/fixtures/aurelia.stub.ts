import { FrameworkConfigurationStub } from './framework-configuration.stub';

export class AureliaStub {
  use: FrameworkConfigurationStub;

  constructor() {
    this.use = new FrameworkConfigurationStub();
  }

  start(): Promise<void> {
    return Promise.resolve();
  }
}
