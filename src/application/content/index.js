import {inject} from 'aurelia-framework';
import {NewsService} from '../../services/news/news-service';

@inject(NewsService)
export class Index {
  constructor(newsService) {
    this.newsService = newsService;
    this.news = [];
  }

  activate() {
    return this.newsService.getAll()
      .then(news => {
        this.news = news.data;
      })
      .catch(() => {
        this.news = [];
      });
  }
}
