import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class NewsService {
    constructor(http) {
        this.http = http;
    }

    getRecent() {
        return this.http.fetch('/api/news').then(response => response.json());
    }

    get(id) {
        return this.http.fetch('/api/news/' + id).then(response => response.json());
    }
}