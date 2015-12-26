import {inject} from 'aurelia-framework';
import {NewsService} from '../../services/news/news-service';

@inject(NewsService)
export class View {
  constructor(newsService) {
    this.newsService = newsService;
  }

  activate(params, routeConfig) {
    return this.newsService.get(params.id)
      .then(news => {
        this.news = news;
        routeConfig.navModel.setTitle(news.title);
      })
      .catch(() => {
      });
  }
}
