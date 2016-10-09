const MAX_WIDTH_MOBILE_NAV = 992;

class NavState {
  navToggled = true;
  mobileNavToggled = false;
  mobileNav = false;

  toggleNav() {
    this.navToggled = !this.navToggled;
  }

  toggleMobileNav() {
    this.mobileNavToggled = !this.mobileNavToggled;
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
