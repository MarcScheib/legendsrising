import { autoinject, BindingEngine, customElement, noView } from 'aurelia-framework';
import { NavState } from './nav-state';
import { NavigationSettings } from './navigation-settings';

@noView()
@customElement('navigation')
@autoinject()
export class Navigation {
  private windowResizeListener: () => void;
  private outsideClickListener: (event?: Event) => void;
  private navLinkClickListener: (event?: Event) => void;

  constructor(private bindingEngine: BindingEngine,
              private navState: NavState,
              private settings: NavigationSettings,
              private element: Element) {
    this.windowResizeListener = () => this.handleResize();
    this.outsideClickListener = (event: Event) => this.handleBlur(event);
    this.navLinkClickListener = (event: Event) => this.handleNavLink(event);

    bindingEngine.propertyObserver(this.navState, 'navToggled').subscribe(this.navStateChanged.bind(this));
    bindingEngine.propertyObserver(this.navState, 'mobileNavToggled').subscribe(this.mobileNavStateChanged.bind(this));
  }

  handleResize(): void {
    if (window.innerWidth < this.settings.maxWidthMobileNav) {
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

  handleBlur(event: Event): void {
    if (this.navState.isMobileNav() === false || event.defaultPrevented === true) {
      return;
    }

    const target = <HTMLElement> event.target;
    if (this.element.contains(target) === false && this.navState.isMobileNavToggled() === true) {
      this.navState.toggle();
    }
  }

  handleNavLink(event: Event): void {
    if (this.navState.isMobileNav() === false || event.defaultPrevented === true) {
      return;
    }

    const target = <HTMLElement> event.target;
    if (this.element.contains(target) === true
      && target.tagName.toLowerCase() === 'a'
      && this.navState.isMobileNavToggled() === true) {
      this.navState.toggle();
    }
  }

  navStateChanged(): void {
    if (this.navState.isMobileNav() === false && this.navState.navToggled === true) {
      this.element.classList.add('show-navigation');
    } else if (this.navState.isMobileNav() === false && this.navState.navToggled === false) {
      this.element.classList.remove('show-navigation');
    }
  }

  mobileNavStateChanged(): void {
    if (this.navState.isMobileNav() === true && this.navState.mobileNavToggled === true) {
      this.element.classList.add('show-navigation');
    } else if (this.navState.isMobileNav() === true && this.navState.mobileNavToggled === false) {
      this.element.classList.remove('show-navigation');
    }
  }

  attached(): void {
    window.addEventListener('resize', this.windowResizeListener);
    document.addEventListener('click', this.outsideClickListener);
    document.addEventListener('click', this.navLinkClickListener);
    this.handleResize();
  }

  detached(): void {
    window.removeEventListener('resize', this.windowResizeListener);
    document.removeEventListener('click', this.outsideClickListener);
    document.removeEventListener('click', this.navLinkClickListener);
  }
}
