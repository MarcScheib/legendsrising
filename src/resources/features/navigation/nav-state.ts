const globalSettings = {
  maxWidthMobileNav: 992
};

class NavState {
  mobileNav: boolean = false;
  navToggled: boolean = true;
  mobileNavToggled: boolean = false;

  constructor() {
    if (window.innerWidth < globalSettings.maxWidthMobileNav) {
      this.mobileNav = true;
      this.navToggled = true;
      this.mobileNavToggled = false;
    }
  }

  toggle(): void {
    if (this.mobileNav) {
      this.mobileNavToggled = !this.mobileNavToggled;
    } else {
      this.navToggled = !this.navToggled;
    }
  }

  setMobileNavToggled(state: boolean): void {
    this.mobileNavToggled = state;
  }

  isMobileNavToggled(): boolean {
    return this.mobileNavToggled;
  }

  setMobileNav(mobileNav: boolean) {
    this.mobileNav = mobileNav;
  }

  isMobileNav(): boolean {
    return this.mobileNav;
  }
}

export {
  globalSettings,
  NavState
};
