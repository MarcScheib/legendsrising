import {inject} from 'aurelia-framework';
import {RoutableComponentActivate} from 'aurelia-router';

import {EntityManagerFactory} from 'resources/features/persistence/index';
import {EntityManager} from 'resources/features/persistence/entity-manager';
import {NewsEntity} from 'resources/entities/news-entity';

@inject(EntityManagerFactory.of(NewsEntity))
export class Index implements RoutableComponentActivate {
  news: NewsEntity[] = [];

  constructor(private entityManager: EntityManager) {
  }

  activate(): Promise<void> {
    return this.entityManager.find({
      '_expand': 'user'
    })
      .then((entities: NewsEntity[]) => {
        this.news = entities;
      })
      .catch(() => {
        this.news = [];
      });
  }
}
