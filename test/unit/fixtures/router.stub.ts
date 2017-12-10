import {PipelineStep, Router} from 'aurelia-router';

export class RouterStub extends Router {
  title: string;
  pipelineProvider: { steps: Array<Function | PipelineStep> };
  unknownRouteConfig: any;

  constructor() {
    super(undefined, undefined);
  }
}
