export class App {
    configureRouter(config, router){
        config.title = 'LegendsRising';
        config.options.pushState = true;
        config.map([
            { route: ['', 'contents', 'contents/index'], moduleId: './contents/index', title: 'Welcome' },
            { route: ['pages/:view'], moduleId: './pages/index', nav: false },
            { route: ['news', 'news/index'], moduleId: './news/index', title: 'News' },
            { route: ['news/view/:id'], moduleId: './news/view', title: 'News' },
            { route: ['users/register'], moduleId: './users/register', title: 'Registration' },
            { route: ['users/signin'], moduleId: './users/signin', title: 'Sign In' }
        ]);

        this.router = router;
    }
}
