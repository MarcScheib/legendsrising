import {
  autoinject,
  bindable,
  BindingEngine,
  bindingMode,
  containerless,
  customElement,
  inlineView
} from 'aurelia-framework';

@containerless
@customElement('data-list')
@inlineView(`
  <template>
    <slot></slot>
  </template>
`)
@autoinject()
export class DataListElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) data;
  @bindable({defaultBindingMode: bindingMode.twoWay}) model;
  @bindable controller;

  pageObserver;

  constructor(private bindingEngine: BindingEngine) {
  }

  attached() {
    this.data = [];
    this.model = {loading: true, currentPage: 1, lastPage: 1, totalPages: 1};
    this.pageObserver = this.bindingEngine.propertyObserver(this.model, 'currentPage').subscribe(this.pageChanged.bind(this));
    this._process();
  }

  detached() {
    this.pageObserver.dispose();
  }

  pageChanged() {
    this._process();
  }

  _process() {
    this.model.loading = true;
    Promise
      .resolve(this.controller.fetchData(this.model.currentPage))
      .then(comments => {
        this.data = this.data.concat(comments);
        this.model.total = comments.total;
        this.model.lastPage = comments.last_page;
        this.model.loading = false;
      });
  }
}
