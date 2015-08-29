import nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';

@noView
export class LoadingIndicator {
  @bindable loading = false;

  loadingChanged(newValue){
    if(newValue){
      nprogress.configure({ showSpinner: false });
      nprogress.start();
    }else{
      nprogress.done();
    }
  }
}
