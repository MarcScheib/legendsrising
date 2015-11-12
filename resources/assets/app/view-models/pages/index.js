import {activationStrategy} from 'aurelia-router';
import {_hyphenate} from 'aurelia-templating';
import {_titlecase} from 'utilities/util';

export class Index {
  constructor() {

  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  getViewStrategy() {
    return 'views/pages/' + this.view + '.html';
  }

  activate(params, routeConfig) {
    this.view = _hyphenate(params.view);
    routeConfig.navModel.setTitle(_titlecase(params.view));
  }
}
