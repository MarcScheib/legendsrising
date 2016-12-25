import {AuthenticateStep} from 'aurelia-authentication';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import {ScrollToTop} from './router/pipeline/ScrollToTop';

@inject(Router)
export default class {
  constructor(router) {
    this.router = router;
  }

  configure() {
    let appRouterConfig = config => {
      config.title = 'LegendsRising';
      config.addPipelineStep('postRender', ScrollToTop);
      config.addPipelineStep('authorize', AuthenticateStep);
      config.options.pushState = false;
      config.map([
        {route: ['/', 'content', 'content/index'], name: 'index', moduleId: 'application/content/index', title: 'Welcome'},
        {route: ['page/:view'], moduleId: 'application/page/index'},
        {route: ['news', 'news/index'], moduleId: 'application/news/index', title: 'News'},
        {route: ['news/view/:id'], moduleId: 'application/news/view', title: 'News'},
        {route: ['user/signup'], moduleId: 'application/user/sign-up', title: 'Sign Up'},
        {route: ['auth/signin'], moduleId: 'application/auth/sign-in', title: 'Sign In'},
        {route: ['auth/signout'], moduleId: 'application/auth/sign-out', title: 'Sign Out'},
        {route: ['profile/view/:id'], moduleId: 'application/profile/view', title: 'Profile', auth: true},
        {route: ['profile/edit'], moduleId: 'application/profile/edit', title: 'Edit Profile', auth: true},
        {route: ['faq', 'faq/index'], moduleId: 'application/faq/index', title: 'FAQ'}
      ]);
      config.mapUnknownRoutes('application/error/error404');
    };

    this.router.configure(appRouterConfig);
  }
}
