import { activationStrategy } from 'aurelia-router';
import { _hyphenate, _titlecase } from '../../utilities/util';
import { PLATFORM } from 'aurelia-pal';

const pages = {
  'legal-notice': PLATFORM.moduleName('application/page/legal-notice.html'),
  'pricing': PLATFORM.moduleName('application/page/pricing.html'),
  'story': PLATFORM.moduleName('application/page/story.html')
};

export class Index {
  view: string;

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  getViewStrategy() {
    return pages[this.view];
  }

  activate(params, routeConfig) {
    this.view = _hyphenate(params.view);
    routeConfig.navModel.setTitle(_titlecase(params.view));
  }
}
