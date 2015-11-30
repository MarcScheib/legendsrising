import AppRouterConfig from '../../assets/app/configuration/router-config';

class RouterStub {
  options = {
    pushState: false
  };

  configure(handler) {
    handler(this);
  }
  addPipelineStep()
  {

  }
  mapUnknownRoutes()
  {

  }
  map(routes) {
    this.routes = routes;
  }
}

class Configure {
  get(key) {
    if (key === 'name')
    {
      return 'LegendsRising';
    }
  }
}

describe('the App module', () => {
  var sut;
  var mockedRouter;
  var mockedConfigure;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    mockedConfigure = new Configure();
    sut = new AppRouterConfig(mockedRouter, mockedConfigure);
    sut.configure();
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