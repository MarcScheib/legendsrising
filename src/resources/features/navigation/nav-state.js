let globalSettings = {
  maxWidthMobileNav: 992
};

class NavState {
  mobileNav = false;
  navToggled = true;
  mobileNavToggled = false;

  constructor() {
    if (window.innerWidth < globalSettings.maxWidthMobileNav) {
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

  isMobileNavToggled() {
    return this.mobileNavToggled;
  }

  setMobileNav(mobileNav) {
    this.mobileNav = mobileNav;
  }

  isMobileNav() {
    return this.mobileNav;
  }
}

export {
  globalSettings,
  NavState
};
