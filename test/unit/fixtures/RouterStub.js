export class RouterStub {
  options = {
    pushState: false
  };

  pipelineSteps = [];

  configure(handler) {
    handler(this);
  }

  addPipelineStep(name, step) {
    this.pipelineSteps.push({name, step})
  }

  mapUnknownRoutes(config) {
    this.unknownRouteConfig = config;
  }

  map(routes) {
    this.routes = routes;
  }
}
