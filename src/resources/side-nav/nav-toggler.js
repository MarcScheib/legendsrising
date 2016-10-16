import {customElement, inlineView} from 'aurelia-templating';
import {NavState} from './nav-state';

@customElement('nav-toggler')
@inlineView(`
  <template>
    <button class="navbar-toggler" type="button" click.delegate="toggle()">
      <i class="fa fa-bars fa-fw"></i>
    </button>
  </template>
`)
export class NavToggler {
  static inject = [NavState];

  constructor(navState) {
    this.navState = navState;
  }

  toggle() {
    this.navState.toggle();
  }
}
