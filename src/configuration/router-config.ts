import { AuthenticateStep } from 'aurelia-authentication';
import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

import { ScrollToTopStep } from './router/pipeline/scroll-to-top-step';

@autoinject()
export default class {
  constructor(public router: Router) {
  }

  configure(): Promise<void> {
    const appRouterConfig = (config: RouterConfiguration) => {
      config.title = 'LegendsRising';
      config.addPipelineStep('postRender', ScrollToTopStep);
      config.addPipelineStep('authorize', AuthenticateStep);
      config.options.pushState = false;
      config.map([
        {
          route: ['/', 'content', 'content/index'],
          name: 'index',
          moduleId: PLATFORM.moduleName('application/content/index'),
          title: 'Welcome'
        },
        {
          route: ['page/:view'],
          moduleId: PLATFORM.moduleName('application/page/index')
        },
        {
          route: ['news', 'news/index'],
          moduleId: PLATFORM.moduleName('application/news/index'),
          title: 'News'
        },
        {
          route: ['news/view/:id'],
          moduleId: PLATFORM.moduleName('application/news/view'),
          title: 'News'
        },
        {
          route: ['user/signup'],
          moduleId: PLATFORM.moduleName('application/user/sign-up'),
          title: 'Sign Up'
        },
        {
          route: ['auth/signin'],
          moduleId: PLATFORM.moduleName('application/auth/sign-in'),
          title: 'Sign In'
        },
        {
          route: ['auth/signout'],
          moduleId: PLATFORM.moduleName('application/auth/sign-out'),
          title: 'Sign Out'
        },
        {
          route: ['profile/view/:id'],
          moduleId: PLATFORM.moduleName('application/profile/view'),
          title: 'Profile',
          auth: true
        },
        // {route: ['profile/edit'], moduleId: PLATFORM.moduleName('application/profile/edit'), title: 'Edit Profile', auth: true},
        {
          route: ['faq', 'faq/index'],
          moduleId: PLATFORM.moduleName('application/faq/index'),
          title: 'FAQ'
        }
      ]);
      config.mapUnknownRoutes(PLATFORM.moduleName('application/error/error404'));
      return config;
    };

    return this.router.configure(appRouterConfig);
  }
}
