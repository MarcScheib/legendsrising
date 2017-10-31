import {smoothScrollReset} from '../../../utilities/smooth-scroll-reset';

export class ScrollToTopStep {
  run(instruction, next) {
    let element = document.getElementsByTagName('main')[0];
    smoothScrollReset(element);
    return next();
  }
}
