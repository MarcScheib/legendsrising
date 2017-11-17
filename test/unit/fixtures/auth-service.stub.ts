export class AuthServiceStub {
  requestDummy;
  reject = false;

  getMe(resource, options = {}) {
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
