import { autoinject, BindingEngine, customElement, noView } from 'aurelia-framework';
import { globalSettings, NavState } from './nav-state';

@noView()
@customElement('navigation')
@autoinject()
export class Navigation {
  private windowResizeListener: () => any;
  private outsideClickListener: (event?) => any;
  private navLinkClickListener: (event?) => any;

  constructor(private bindingEngine: BindingEngine,
              private navState: NavState,
              private element: Element) {
    this.windowResizeListener = () => this.handleResize();
    this.outsideClickListener = event => this.handleBlur(event);
    this.navLinkClickListener = event => this.handleNavLink(event);

    bindingEngine.propertyObserver(this.navState, 'navToggled').subscribe(this.navStateChanged.bind(this));
    bindingEngine.propertyObserver(this.navState, 'mobileNavToggled').subscribe(this.mobileNavStateChanged.bind(this));
  }

  handleResize() {
    if (window.innerWidth < globalSettings.maxWidthMobileNav) {
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
