import {AuthorizeStep} from 'aurelia-auth';

import AppRouterConfig from '../../src/configuration/router-config';
import {ScrollToTop} from '../../src/configuration/router/pipeline/ScrollToTop';

class RouterStub {
  options = {
    pushState: false
  };

  pipelineSteps = [];

  configure(handler) {
    handler(this);
  }

  addPipelineStep(name, step) {
    this.pipelineSteps.push({name, step})
  }

  mapUnknownRoutes(config) {
    this.unknownRouteConfig = config;
  }

  map(routes) {
    this.routes = routes;
  }
}

class Configure {
  get(key) {
    if (key === 'name') {
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

  it('configures router push state', () => {
    expect(sut.router.options.pushState).toBe(true);
  });

  it('contains an authorize router pipeline step', () => {
    expect(sut.router.pipelineSteps).toContain({name: 'authorize', step: AuthorizeStep});
  });

  it('contains an ScrollToTop router pipeline step', () => {
    expect(sut.router.pipelineSteps).toContain({name: 'postcomplete', step: ScrollToTop});
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({
      route: ['/', 'contents', 'contents/index'],
      name: 'index',
      moduleId: 'view-models/contents/index',
      title: 'Welcome'
    });
  });

  it('should have a news list route', () => {
    expect(sut.router.routes).toContain({
      route: ['news', 'news/index'],
      moduleId: 'view-models/news/index',
      title: 'News'
    });
  });

  it('should have a news view route', () => {
    expect(sut.router.routes).toContain({
      route: ['news/view/:id'],
      moduleId: 'view-models/news/view',
      title: 'News'
    });
  });

  it('should have auth routes', () => {
    expect(sut.router.routes).toContain({
      route: ['users/signup'],
      moduleId: 'view-models/users/sign-up',
      title: 'Sign Up'
    });
    expect(sut.router.routes).toContain({
      route: ['auth/signin'],
      moduleId: 'view-models/auth/sign-in',
      title: 'Sign In'
    });
    expect(sut.router.routes).toContain({
      route: ['auth/signout'],
      moduleId: 'view-models/auth/sign-out',
      title: 'Sign Out'
    });
  });

  it('should have a unknown route config', () => {
    expect(sut.router.unknownRouteConfig).toEqual(jasmine.any(String));
    expect(sut.router.unknownRouteConfig).toEqual('view-models/errors/error404');
  });
});
