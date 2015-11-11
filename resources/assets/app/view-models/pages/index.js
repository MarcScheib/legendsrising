import {activationStrategy} from 'aurelia-router';
import {hyphenate} from 'aurelia-templating';

export class Index {
  constructor() {

  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  getViewStrategy() {
    return 'views/pages/' + this.view + '.html';
  }

  activate(params) {
    this.view = hyphenate(params.view);
  }
}
