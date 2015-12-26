import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Configure} from 'aurelia-configuration';

import {ScrollToTop} from './router/pipeline/ScrollToTop';

@inject(Router, Configure)
export default class {
  constructor(router, configure) {
    this.router = router;
    this.configuration = configure;
  }

  configure() {
    let appRouterConfig = config => {
      config.title = this.configuration.get('name');
      config.addPipelineStep('postcomplete', ScrollToTop);
      config.addPipelineStep('authorize', AuthorizeStep);
      config.options.pushState = false;
      config.map([
        {route: ['/', 'contents', 'contents/index'], name: 'index', moduleId: 'view-models/contents/index', title: 'Welcome'},
        {route: ['pages/:view'], moduleId: 'view-models/pages/index'},
        {route: ['news', 'news/index'], moduleId: 'view-models/news/index', title: 'News'},
        {route: ['news/view/:id'], moduleId: 'view-models/news/view', title: 'News'},
        {route: ['users/signup'], moduleId: 'view-models/users/sign-up', title: 'Sign Up'},
        {route: ['auth/signin'], moduleId: 'view-models/auth/sign-in', title: 'Sign In'},
        {route: ['auth/signout'], moduleId: 'view-models/auth/sign-out', title: 'Sign Out'},
        {route: ['profiles/view/:id'], moduleId: 'view-models/profiles/view', title: 'Profile', auth: true},
        {route: ['profiles/edit'], moduleId: 'view-models/profiles/edit', title: 'Edit Profile', auth: true}
      ]);
      config.mapUnknownRoutes('view-models/errors/error404');
    };

    this.router.configure(appRouterConfig);
  }
}
