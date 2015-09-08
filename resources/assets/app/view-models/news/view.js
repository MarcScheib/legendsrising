import {inject} from 'aurelia-framework';
import {NewsService} from 'services/news/news-service';

@inject(NewsService)
export class View {
    constructor(newsService) {
        this.newsService = newsService;
    }

    activate(params) {
        this.newsService.get(params.id).then(data => {
            this.news = data;
        });
    }
}