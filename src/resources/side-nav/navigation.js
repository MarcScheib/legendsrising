import {BindingEngine, customElement, noView, inject} from 'aurelia-framework';
import {UIState} from './ui-state';

@noView()
@customElement('navigation')
@inject(BindingEngine, UIState, Element)
export class Navigation {
  showNavigationEvent = () => {
    if (window.innerWidth < 1200) {
      this.uiState.hideNav();
    } else {
      this.uiState.showNav();
    }
  };

  constructor(bindingEngine, uiState, element) {
    this.uiState = uiState;
    this.element = element;

    let subscription = bindingEngine.propertyObserver(this.uiState, 'navVisible').subscribe(this.navStateChanged.bind(this));
  }

  navStateChanged(newValue, oldValue) {
    if (this.uiState.navVisible) {
      this.element.classList.remove('sidebar-nav-hidden')
    } else {
      this.element.classList.add('sidebar-nav-hidden')
    }
  }

  attached() {
    window.addEventListener('resize', this.showNavigationEvent);
  }

  detached() {
    window.removeEventListener('resize', this.showNavigationEvent);
  }
}
