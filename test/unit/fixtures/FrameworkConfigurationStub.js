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

  globalResources(resources) {
    this.info.concat(resources);
    return this;
  }

  plugin(pluginName) {
    this.info.push(pluginName);
    return this;
  }

  feature(featureName) {
    this.info.push(featureName);
    return this;
  }
}
