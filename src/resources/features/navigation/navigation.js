import {BindingEngine, customElement, noView, inject} from 'aurelia-framework';
import {NavState, MAX_WIDTH_MOBILE_NAV} from './nav-state';

@noView()
@customElement('navigation')
@inject(BindingEngine, NavState, Element)
export class Navigation {
  constructor(bindingEngine, navState, element) {
    this.navState = navState;
    this.element = element;
    this.windowResizeListener = () => this.handleResize();
    this.outsideClickListener = event => this.handleBlur(event);
    this.navLinkClickListener = event => this.handleNavLink(event);

    bindingEngine.propertyObserver(this.navState, 'navToggled').subscribe(this.navStateChanged.bind(this));
    bindingEngine.propertyObserver(this.navState, 'mobileNavToggled').subscribe(this.mobileNavStateChanged.bind(this));
  }

  handleResize() {
    if (window.innerWidth < MAX_WIDTH_MOBILE_NAV) {
      this.element.classList.remove('navigation-pinned');
      this.navState.setMobileNav(true);
      this.navState.setMobileNavToggled(false);
      this.mobileNavStateChanged();
    } else {
      this.element.classList.add('navigation-pinned');
      this.navState.setMobileNav(false);
      this.navStateChanged();
    }
  }

  handleBlur(event) {
    if (this.navState.isMobileNav() === false || event.defaultPrevented === true) {
      return;
    }

    if (this.element.contains(event.target) === false && this.navState.isMobileNavToggled() === true) {
      this.navState.toggle();
    }
  }

  handleNavLink(event) {
    if (this.navState.isMobileNav() === false || event.defaultPrevented === true) {
      return;
    }

    if (this.element.contains(event.target) === true && event.target.tagName.toLowerCase() === 'a' && this.navState.isMobileNavToggled() === true) {
      console.log(event.target);
      this.navState.toggle();
    }
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
      this.element.classList.remove('show-navigation');
    }
  }

  attached() {
    window.addEventListener('resize', this.windowResizeListener);
    document.addEventListener('click', this.outsideClickListener);
    document.addEventListener('click', this.navLinkClickListener);
    this.handleResize();
  }

  detached() {
    window.removeEventListener('resize', this.windowResizeListener);
    document.removeEventListener('click', this.outsideClickListener);
    document.removeEventListener('click', this.navLinkClickListener);
  }
}
