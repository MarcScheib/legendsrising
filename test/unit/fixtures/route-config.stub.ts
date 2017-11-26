import { RouteConfig } from 'aurelia-router';

import { NavModelStub } from './nav-model.stub';

export class RouteConfigStub implements RouteConfig {
  route: string;
  navModel: NavModelStub = new NavModelStub();
}
