import { autoinject } from 'aurelia-framework';
import { NavigationSettings } from './navigation-settings';

@autoinject()
export class NavState {
  mobileNav: boolean = false;
  navToggled: boolean = true;
  mobileNavToggled: boolean = false;

  constructor(private settings: NavigationSettings) {
    if (window.innerWidth < settings.maxWidthMobileNav) {
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

  setMobileNav(mobileNav: boolean): void {
    this.mobileNav = mobileNav;
  }

  isMobileNav(): boolean {
    return this.mobileNav;
  }
}
