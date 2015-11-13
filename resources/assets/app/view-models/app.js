import {inject} from 'aurelia-framework';
import {Configure} from 'aurelia-configuration';
import 'jquery';
import 'twbs/bootstrap';

@inject(Configure)
export class App {
  constructor(configure) {
    this.configure = configure;
  }

  configureRouter(config, router) {
    config.title = this.configure.get('name');
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
      console.log(instruction);
      return 'view-models/errors/error404';
    });

    this.router = router;
  }
}
