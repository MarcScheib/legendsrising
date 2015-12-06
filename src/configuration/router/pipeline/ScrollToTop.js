export class ScrollToTop {
  run(instruction, next) {
    document.body.scrollTop = 0;
    return next();
  }
}
