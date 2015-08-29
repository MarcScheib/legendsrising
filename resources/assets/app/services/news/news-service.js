import {inject} from 'aurelia-framework';
import {FetchClient} from 'aurelia-fetch-client';

@inject(FetchClient)
export class NewsService {
    constructor(fetch) {
        this.fetch = fetch;
    }

    getRecent() {
        return this.fetch.get('/api/news.json');
    }

    get(id) {
        return this.fetch.get('/api/news/' + id + '.json');
    }
}