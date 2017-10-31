import {bindable, customElement, inlineView} from 'aurelia-templating';

@customElement('no-data')
@inlineView(`
<template>
  <div class="card card-block" if.bind="visible">
    <p class="card-text">\${message ? message : 'There is no data available currently.'}</p>
  </div>
</template>
`)
export class NoData {
  @bindable message;
  @bindable visible = false;
}
