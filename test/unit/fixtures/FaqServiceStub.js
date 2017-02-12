export class FaqServiceStub {
  reject = false;

  get() {
    var response = this.itemStub;
    return new Promise((resolve, reject) => {
      if (this.reject == false) {
        resolve(response);
      } else {
        reject();
      }
    });
  }
}
