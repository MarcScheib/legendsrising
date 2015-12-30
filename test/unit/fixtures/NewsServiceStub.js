export class NewsServiceStub {
  reject = false;

  getRecent() {
    var response = this.itemStub;
    return new Promise((resolve, reject) => {
      if (this.reject == false) {
        resolve(response);
      } else {
        reject();
      }
    });
  }

  get(id) {
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
