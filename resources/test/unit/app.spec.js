import {App} from '../../assets/app/view-models/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut
    , mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('LegendsRising');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['/', 'contents', 'contents/index'], name: 'index',  moduleId: 'view-models/contents/index', title:'Welcome' });
  });
});