import {inject} from 'aurelia-framework';
import {NewsService} from 'services/news/news-service';

@inject(NewsService)
export class Index {
    constructor(newsService) {
        this.newsService = newsService;
        this.news = [];
    }

    activate() {
        this.newsService.getRecent().then(data => {
            console.log(data);
            this.news = data.news;
        });
    }
}