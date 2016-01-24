import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {NewsService} from '../../services/news/news-service';

@inject(NewsService, AuthService)
export class View {
  constructor(newsService, authService) {
    this.newsService = newsService;
    this.authService = authService;
  }

  activate(params, routeConfig) {
    let user = this.authService.getMe()
      .then(user => {
        this.user = user;
      });

    let news = this.newsService.get(params.id)
      .then(news => {
        this.news = news;
        routeConfig.navModel.setTitle(news.title);
      })
      .catch(() => {
        this.news = null;
      });

    return Promise.all([user, news]);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
