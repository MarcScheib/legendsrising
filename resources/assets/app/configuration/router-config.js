import {AuthorizeStep} from 'paulvanbladel/aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Configure} from 'aurelia-configuration';

@inject(Router, Configure)
export default class {
  constructor(router, configure) {
    this.router = router;
    this.configuration = configure;
  }

  configure() {
    let appRouterConfig = config => {
      config.title = this.configuration.get('name');
      //config.addPipelineStep('authorize', AuthorizeStep);
      config.options.pushState = true;
      config.map([
        {route: ['/', 'contents', 'contents/index'], name: 'index', moduleId: 'view-models/contents/index', title: 'Welcome'},
        {route: ['pages/:view'], moduleId: 'view-models/pages/index'},
        {route: ['news', 'news/index'], moduleId: 'view-models/news/index', title: 'News'},
        {route: ['news/view/:id'], moduleId: 'view-models/news/view', title: 'News'},
        {route: ['users/register'], moduleId: 'view-models/users/register', title: 'Registration'},
        {route: ['users/signin'], moduleId: 'view-models/users/signin', title: 'Sign In'}
      ]);
      config.mapUnknownRoutes(instruction => {
        return 'view-models/errors/error404';
      });
    };

    this.router.configure(appRouterConfig);
  }
}
