export class HttpServiceStub {
  requestDummy;
  reject = false;

  fetch(resource, options = {}) {
    this.resource = resource;
    this.options = options;

    return new Promise((resolve, reject) => {
      if (this.reject == false) {
        resolve(this.requestDummy);
      } else {
        reject();
      }
    });
  }
}
