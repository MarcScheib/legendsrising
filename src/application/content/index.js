import {inject} from 'aurelia-framework';
import {EntityManagerFactory} from '../../resources/features/persistence/entity-manager-factory';
import {NewsEntity} from '../../resources/entities/news-entity';

@inject(EntityManagerFactory.of(NewsEntity))
export class Index {
  constructor(entityManager) {
    this.entityManager = entityManager;
    this.news = [];
  }

  activate() {
    return this.entityManager.find({
      '_expand': 'user'
    })
      .then(entities => {
        this.news = entities;
      })
      .catch(() => {
        this.news = [];
      });
  }
}
