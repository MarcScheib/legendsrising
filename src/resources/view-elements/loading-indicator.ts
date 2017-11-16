import nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';

@noView
export class LoadingIndicator {
  @bindable loading: boolean = false;

  loadingChanged(newValue: any): void {
    if (newValue) {
      nprogress.configure({ showSpinner: false });
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}
