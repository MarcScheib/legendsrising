import { NavigationInstruction, Next, PipelineStep } from 'aurelia-router';

import { smoothScrollReset } from '../../../utilities/smooth-scroll-reset';

export class ScrollToTopStep implements PipelineStep {
  run(instruction: NavigationInstruction, next: Next) {
    const element = document.getElementsByTagName('main')[0];
    smoothScrollReset(element);
    return next();
  }
}
