export class UIState {
  sideNavigationVisibility = true;

  toggleSideNavigation() {
    this.sideNavigationVisibility = !this.sideNavigationVisibility;
  }

  showSideNavigation() {
    this.sideNavigationVisibility = true;
  }

  hideSideNavigation() {
    this.sideNavigationVisibility = false;
  }
}
