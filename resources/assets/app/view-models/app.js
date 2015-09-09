import 'jquery';
import 'twbs/bootstrap';

export class App {
    configureRouter(config, router){
        this.router = router;

        config.title = 'LegendsRising';
        config.options.pushState = true;
        config.map([
            { route: ['/', 'contents', 'contents/index'], name: 'index', moduleId: 'view-models/contents/index', title: 'Welcome' },
            { route: ['pages/:view'], moduleId: 'view-models/pages/index', nav: false },
            { route: ['news', 'news/index'], moduleId: 'view-models/news/index', title: 'News' },
            { route: ['news/view/:id'], moduleId: 'view-models/news/view', title: 'News' },
            { route: ['users/register'], moduleId: 'view-models/users/register', title: 'Registration' },
            { route: ['users/signin'], moduleId: 'view-models/users/signin', title: 'Sign In' }
        ]);
    }
}
