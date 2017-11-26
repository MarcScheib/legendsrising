import { Aurelia, FrameworkConfiguration } from 'aurelia-framework';

export class FrameworkConfigurationStub extends FrameworkConfiguration {
  public info: string[];

  constructor(aurelia: Aurelia) {
    super(aurelia);
    this.info = [];
  }

  defaultBindingLanguage(): FrameworkConfigurationStub {
    return this.plugin('aurelia-templating-binding');
  }

  defaultResources(): FrameworkConfigurationStub {
    return this.plugin('aurelia-templating-resources');
  }

  history(): FrameworkConfigurationStub {
    return this.plugin('aurelia-history-browser');
  }

  router(): FrameworkConfigurationStub {
    return this.plugin('aurelia-templating-router');
  }

  eventAggregator(): FrameworkConfigurationStub {
    return this.plugin('aurelia-event-aggregator');
  }

  globalResources(resources: string): FrameworkConfigurationStub {
    this.info.concat(resources);
    return this;
  }

  plugin(pluginName: string): FrameworkConfigurationStub {
    this.info.push(pluginName);
    return this;
  }

  feature(featureName: string): FrameworkConfigurationStub {
    this.info.push(featureName);
    return this;
  }
}
