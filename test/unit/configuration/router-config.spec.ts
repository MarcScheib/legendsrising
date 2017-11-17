import {AuthenticateStep} from 'aurelia-authentication';
import AppRouterConfig from '../../../src/configuration/router-config';
import {ScrollToTopStep} from '../../../src/configuration/router/pipeline/scroll-to-top-step';
import {RouterStub} from '../fixtures/router.stub';

describe('the router configuration', () => {
  let sut;
  let mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new AppRouterConfig(mockedRouter);
    sut.configure();
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('LegendsRising');
  });

  it('configures no router push state', () => {
    expect(sut.router.options.pushState).toBe(false);
  });

  it('contains an authorize router pipeline step', () => {
    expect(sut.router.pipelineSteps).toContain({name: 'authorize', step: AuthenticateStep});
  });

  it('contains an ScrollToTopStep router pipeline step', () => {
    expect(sut.router.pipelineSteps).toContain({name: 'postRender', step: ScrollToTopStep});
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({
      route: ['/', 'content', 'content/index'],
      name: 'index',
      moduleId: 'application/content/index',
      title: 'Welcome'
    });
  });

  it('should have a news list route', () => {
    expect(sut.router.routes).toContain({
      route: ['news', 'news/index'],
      moduleId: 'application/news/index',
      title: 'News'
    });
  });

  it('should have a news view route', () => {
    expect(sut.router.routes).toContain({
      route: ['news/view/:id'],
      moduleId: 'application/news/view',
      title: 'News'
    });
  });

  it('should have auth routes', () => {
    expect(sut.router.routes).toContain({
      route: ['user/signup'],
      moduleId: 'application/user/sign-up',
      title: 'Sign Up'
    });
    expect(sut.router.routes).toContain({
      route: ['auth/signin'],
      moduleId: 'application/auth/sign-in',
      title: 'Sign In'
    });
    expect(sut.router.routes).toContain({
      route: ['auth/signout'],
      moduleId: 'application/auth/sign-out',
      title: 'Sign Out'
    });
  });

  it('should have profile routes', () => {
    expect(sut.router.routes).toContain({
      route: ['profile/view/:id'],
      moduleId: 'application/profile/view',
      title: 'Profile',
      auth: true
    });
    expect(sut.router.routes).toContain({
      route: ['profile/edit'],
      moduleId: 'application/profile/edit',
      title: 'Edit Profile',
      auth: true
    });
  });

  it('should have a unknown route config', () => {
    expect(sut.router.unknownRouteConfig).toEqual(jasmine.any(String));
    expect(sut.router.unknownRouteConfig).toEqual('application/error/error404');
  });
});
