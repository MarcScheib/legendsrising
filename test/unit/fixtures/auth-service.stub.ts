export class AuthServiceStub {
  requestDummy: any;
  reject: boolean = false;

  private resource: any;
  private options: {};

  isAuthenticated(): boolean {
    return true;
  }

  getMe(resource: any, options: {} = {}): any {
    this.resource = resource;
    this.options = options;

    return new Promise((resolve: (value?: any) => void, reject: () => void) => {
      if (this.reject === false) {
        resolve(this.requestDummy);
      } else {
        reject();
      }
    });
  }
}
