import {customElement, containerless, inlineView} from 'aurelia-templating';
import {NavState} from './nav-state';

@containerless
@customElement('nav-toggler')
@inlineView(`
  <template>
    <button class="navbar-toggler mr-1" type="button" click.delegate="toggle()"></button>
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
