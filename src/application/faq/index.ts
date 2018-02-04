import {inject} from 'aurelia-framework';
import {RoutableComponentActivate} from 'aurelia-router';

import {EntityManagerFactory} from 'resources/features/persistence/index';
import {FaqEntity} from 'resources/entities/faq-entity';
import {EntityManager} from 'resources/features/persistence/entity-manager';

@inject(EntityManagerFactory.of(FaqEntity))
export class Index implements RoutableComponentActivate {
  faqs: FaqEntity[] = [];

  constructor(public entityManager: EntityManager) {
  }

  activate(): Promise<void> {
    return this.entityManager.find()
      .then((entities: FaqEntity[]) => {
        this.faqs = entities;
      })
      .catch(() => {
        this.faqs = [];
      });
  }
}
