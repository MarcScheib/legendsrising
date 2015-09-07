import 'jquery';
import 'twbs/bootstrap';

export class App {
    configureRouter(config, router){
        this.router = router;

        config.title = 'LegendsRising';
        config.options.pushState = true;
        config.map([
            { route: ['', 'contents', 'contents/index'], name: 'index', moduleId: 'view-models/contents/index', title: 'Welcome' },
            { route: ['pages/:view'], moduleId: 'view-models/pages/index', nav: false }/**,
            { route: ['news', 'news/index'], moduleId: 'news/index', title: 'News' },
            { route: ['news/view/:id'], moduleId: 'news/view', title: 'News' },
            { route: ['users/register'], moduleId: 'users/register', title: 'Registration' },
            { route: ['users/signin'], moduleId: 'users/signin', title: 'Sign In' }**/
        ]);
    }
}
