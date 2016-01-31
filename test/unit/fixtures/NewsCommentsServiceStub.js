export class NewsCommentsServiceStub {
  reject = false;

  getRecent(id) {
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
