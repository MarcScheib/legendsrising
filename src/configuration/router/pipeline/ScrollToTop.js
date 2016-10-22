export class ScrollToTop {
  run(instruction, next) {
    this.scrollSmooth();
    return next();
  }

  scrollSmooth() {
    let element = document.getElementsByTagName('main')[0];
    let movingFrequency = 15;
    let hops = 33;
    let gap = element.scrollTop / hops;

    for (var i = 1; i <= hops; i++) {
      (function() {
        setTimeout(() => {
          element.scrollTop = Math.max(element.scrollTop - gap, 0);
        }, movingFrequency * i);
      })();
    }
  }
}
