export class UIState {
  navVisible = true;

  toggleNav() {
    this.navVisible = !this.navVisible;
  }

  showNav() {
    this.navVisible = true;
  }

  hideNav() {
    this.navVisible = false;
  }
}
