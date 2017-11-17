export class EndpointServiceStub {
  requestDummy;
  reject = false;

  find(resource, options) {
    return this.fetch(resource, options);
  }

  findOne(resource, options) {
    return this.fetch(resource, options);
  }

  create(resource, options) {
    return this.fetch(resource, options);
  }

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
