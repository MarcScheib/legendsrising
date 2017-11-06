import {
  autoinject,
  bindable,
  BindingEngine,
  bindingMode,
  containerless,
  customElement,
  inlineView
} from 'aurelia-framework';
import { ComponentAttached, ComponentDetached } from 'aurelia-templating';
import { Disposable } from 'aurelia-binding';

import { DataListController } from './data-list-controller';

@containerless
@customElement('data-list')
@inlineView(`
  <template>
    <slot></slot>
  </template>
`)
@autoinject()
export class DataListElement implements ComponentAttached, ComponentDetached {
  @bindable({defaultBindingMode: bindingMode.twoWay}) data: any[];
  @bindable({defaultBindingMode: bindingMode.twoWay}) model: any;
  @bindable controller: DataListController;

  pageObserver: Disposable;

  constructor(private bindingEngine: BindingEngine) {
  }

  attached(): void {
    this.data = [];
    this.model = {loading: true, currentPage: 1, lastPage: 1, totalPages: 1};
    this.pageObserver = this.bindingEngine.propertyObserver(this.model, 'currentPage').subscribe(this.pageChanged.bind(this));
    this._process();
  }

  detached(): void {
    this.pageObserver.dispose();
  }

  pageChanged(): void {
    this._process();
  }

  private _process(): void {
    this.model.loading = true;
    Promise
      .resolve(this.controller.fetchData(this.model.currentPage))
      .then((fetchedData: any) => {
        this.data = this.data.concat(fetchedData);
        this.model.total = fetchedData.total;
        this.model.lastPage = fetchedData.last_page;
        this.model.loading = false;
      });
  }
}
