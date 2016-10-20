const MAX_WIDTH_MOBILE_NAV = 992;

class NavState {
  mobileNav = false;
  navToggled = true;
  mobileNavToggled = false;

  constructor() {
    if (window.innerWidth < MAX_WIDTH_MOBILE_NAV) {
      this.mobileNav = true;
      this.navToggled = true;
      this.mobileNavToggled = false;
    }
  }

  toggle() {
    if (this.mobileNav) {
      this.mobileNavToggled = !this.mobileNavToggled;
    } else {
      this.navToggled = !this.navToggled;
    }
  }

  setMobileNavToggled(state) {
    this.mobileNavToggled = state;
  }

  setMobileNav(mobileNav) {
    this.mobileNav = mobileNav;
  }

  isMobileNav() {
    return this.mobileNav;
  }
}

export {
  MAX_WIDTH_MOBILE_NAV,
  NavState
};
