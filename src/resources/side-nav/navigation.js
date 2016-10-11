import {BindingEngine, customElement, noView, inject} from 'aurelia-framework';
import {NavState, MAX_WIDTH_MOBILE_NAV} from './nav-state';

@noView()
@customElement('navigation')
@inject(BindingEngine, NavState, Element)
export class Navigation {
  showNavigationEvent = () => {
    if (window.innerWidth < MAX_WIDTH_MOBILE_NAV) {
      this.navState.setMobileNav(true);
      this.element.classList.remove('navigation-pinned');
    } else {
      this.navState.setMobileNav(false);
      this.element.classList.add('navigation-pinned');
    }
  };

  constructor(bindingEngine, navState, element) {
    this.navState = navState;
    this.element = element;

    bindingEngine.propertyObserver(this.navState, 'navToggled').subscribe(this.navStateChanged.bind(this));
    bindingEngine.propertyObserver(this.navState, 'mobileNavToggled').subscribe(this.mobileNavStateChanged.bind(this));
    this.showNavigationEvent();
  }

  navStateChanged() {
    if (this.navState.isMobileNav() === false && this.navState.navToggled === true) {
      this.element.classList.add('show-navigation');
    } else if (this.navState.isMobileNav() === false && this.navState.navToggled === false) {
      this.element.classList.remove('show-navigation');
    }
  }

  mobileNavStateChanged() {
    if (this.navState.isMobileNav() === true && this.navState.mobileNavToggled === true) {
      this.element.classList.add('show-navigation');
    } else if (this.navState.isMobileNav() === true && this.navState.mobileNavToggled === false) {
      this.element.classList.remove('show-navigation')
    }
  }

  attached() {
    window.addEventListener('resize', this.showNavigationEvent);
  }

  detached() {
    window.removeEventListener('resize', this.showNavigationEvent);
  }
}
