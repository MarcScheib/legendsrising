import {bindable, customElement, inlineView} from 'aurelia-templating';

@customElement('no-data')
@inlineView(`
<template>
  <div class="card" if.bind="visible">
    <div class="card-body">
      <p class="card-text">\${message ? message : 'There is no data available currently.'}</p>
    </div>
  </div>
</template>
`)
export class NoData {
  @bindable message: string;
  @bindable visible: boolean = false;
}
