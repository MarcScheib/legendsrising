import { Rest } from 'aurelia-api';

export class RestStub extends Rest {
  path: string;
  body: {};

  requestDummy: any;
  reject: boolean = false;

  request(method: string, path: string, body?: {}, options?: {}): Promise<any | Error> {
    this.path = path;
    this.body = body;

    return new Promise((resolve: (value?: any) => void, reject: () => void) => {
      if (this.reject === false) {
        resolve(this.requestDummy);
      } else {
        reject();
      }
    });
  }
}
