export class FrameworkConfigurationStub {
  constructor() {
    this.info = [];
  }

  defaultBindingLanguage() {
    return this.plugin('aurelia-templating-binding');
  }

  defaultResources() {
    return this.plugin('aurelia-templating-resources');
  }

  history() {
    return this.plugin('aurelia-history-browser');
  }

  router() {
    return this.plugin('aurelia-templating-router');
  }

  eventAggregator() {
    return this.plugin('aurelia-event-aggregator');
  }

  plugin(pluginName) {
    this.info.push(pluginName);
    return this;
  }
}
