import { activationStrategy } from 'aurelia-router';
import { _hyphenate, _titlecase } from '../../utilities/util';

export class Index {
  view: string;

  constructor() {
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  getViewStrategy() {
    return 'application/page/' + this.view + '.html';
  }

  activate(params, routeConfig) {
    this.view = _hyphenate(params.view);
    routeConfig.navModel.setTitle(_titlecase(params.view));
  }
}
