import {customElement, containerless, bindable, bindingMode, inlineView} from 'aurelia-framework';

@containerless
@customElement('data-loader')
@inlineView(`
  <template>
      <template replaceable part="item-template">
        <a href="#" click.delegate="nextPage()">Next</a>
      </template>
  </template>
`)
export class DataLoaderElement {
  @bindable({defaultBindingMode: bindingMode.twoWay}) dataListModel;

  nextPage() {
    this.dataListModel.currentPage++;
  }
}
