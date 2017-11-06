import { autoinject } from 'aurelia-framework';
import { containerless, customElement, inlineView } from 'aurelia-templating';
import { NavState } from './nav-state';

@containerless
@customElement('nav-toggler')
@inlineView(`
  <template>
    <button class="navbar-toggler mr-1" type="button" click.delegate="toggle()"></button>
  </template>
`)
@autoinject()
export class NavToggler {
  constructor(private navState: NavState) {
  }

  toggle(): void {
    this.navState.toggle();
  }
}
