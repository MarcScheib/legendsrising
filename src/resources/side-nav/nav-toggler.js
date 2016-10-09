import {customElement, inlineView} from 'aurelia-templating';
import {NavState, MAX_WIDTH_MOBILE_NAV} from './nav-state';

@customElement('nav-toggler')
@inlineView(`
  <template>
    <button class="navbar-toggler" type="button" click.delegate="toggleNav()">
      <i class="fa fa-bars fa-fw"></i>
    </button>
  </template>
`)
export class NavToggler {
  static inject = [NavState];

  constructor(navState) {
    this.navState = navState;
  }

  toggleNav() {
    if (this.navState.isMobileNav() == false) {
      this.navState.toggleNav();
    } else {
      this.navState.toggleMobileNav();
    }
  }
}
