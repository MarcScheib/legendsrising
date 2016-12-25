export class ScrollToTop {
  run(instruction, next) {
    this.scrollSmooth();
    return next();
  }

  scrollSmooth() {
    let element = document.getElementsByTagName('main')[0];
    if (element !== undefined) {
      let movingFrequency = 15;
      let hops = 33;
      let gap = element.scrollTop / hops;

      for (let i = 1; i <= hops; i++) {
        setTimeout(() => {
          element.scrollTop = Math.max(element.scrollTop - gap, 0);
        }, movingFrequency * i);
      }
    }
  }
}
