import {PLATFORM} from 'aurelia-pal';
import {
  activationStrategy,
  RoutableComponentActivate,
  RoutableComponentDetermineActivationStrategy,
  RouteConfig
} from 'aurelia-router';

import {_hyphenate, _titlecase} from 'utilities/util';

const pages = {
  'legal-notice': PLATFORM.moduleName('application/page/legal-notice.html'),
  'pricing': PLATFORM.moduleName('application/page/pricing.html'),
  'story': PLATFORM.moduleName('application/page/story.html')
};

export class Index implements RoutableComponentActivate, RoutableComponentDetermineActivationStrategy {
  view: string;

  determineActivationStrategy(): 'replace' {
    return activationStrategy.replace;
  }

  getViewStrategy(): string {
    return pages[this.view];
  }

  activate(params: any, routeConfig: RouteConfig): void {
    this.view = _hyphenate(params.view);
    routeConfig.navModel.setTitle(_titlecase(params.view));
  }
}
