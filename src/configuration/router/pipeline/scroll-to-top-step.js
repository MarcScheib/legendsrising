import {smoothScrollTo} from '../../../utilities/smooth-scroll-to';

export class ScrollToTopStep {
  run(instruction, next) {
    let element = document.getElementsByTagName('main')[0];
    smoothScrollTo(element);
    return next();
  }
}
