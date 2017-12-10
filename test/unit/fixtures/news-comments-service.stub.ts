export class NewsCommentsServiceStub {
  reject: boolean = false;
  itemStub: any;

  getAll(id: number): Promise<void> {
    const response = this.itemStub;
    return new Promise((resolve: (value?: PromiseLike<any> | any) => void, reject: (reason?: any) => void) => {
      if (this.reject === false) {
        resolve(response);
      } else {
        reject();
      }
    });
  }
}
