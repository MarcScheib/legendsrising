export class HttpServiceStub {
  mockedRequest;
  reject = false;

  fetch(resource, options = {}) {
    this.resource = resource;
    this.options = options;

    return new Promise((resolve, reject) => {
      if (this.reject == false) {
        resolve(this.mockedRequest);
      } else {
        reject();
      }
    });
  }
}
