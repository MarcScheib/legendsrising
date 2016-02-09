import {inject} from 'aurelia-framework';
import {EntityManager} from 'aurelia-orm';

@inject(EntityManager)
export class Index {
  constructor(entityManager) {
    this.newsRepository = entityManager.getRepository('news');
    this.news = [];
  }

  activate() {
    return this.newsRepository.find()
      .then(news => {
        this.news = news;
      })
      .catch(() => {
        this.news = [];
      });
  }
}
