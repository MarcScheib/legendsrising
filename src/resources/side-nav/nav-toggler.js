import {customElement, inlineView} from 'aurelia-templating';
import {UIState} from './ui-state';

@customElement('nav-toggler')
@inlineView(`
  <template>
    <button class="navbar-toggler" type="button" click.delegate="toggleNav()">
      <i class="fa fa-bars fa-fw"></i>
    </button>
  </template>
`)
export class NavToggler {
  static inject = [UIState];

  constructor(uiState) {
    this.uiState = uiState;
  }

  toggleNav() {
    this.uiState.toggleNav();
  }
}
