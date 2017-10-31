import { inject } from 'aurelia-framework';
import { RoutableComponentActivate } from 'aurelia-router';

import { EntityManagerFactory } from '../../resources/features/persistence/index';
import { FaqEntity } from '../../resources/entities/faq-entity';
import { EntityManager } from '../../resources/features/persistence/entity-manager';

@inject(EntityManagerFactory.of(FaqEntity))
export class Index implements RoutableComponentActivate {
  faqs: FaqEntity[] = [];

  constructor(private entityManager: EntityManager) {
  }

  activate() {
    return this.entityManager.find()
      .then(entities => {
        this.faqs = entities;
      })
      .catch(() => {
        this.faqs = [];
      });
  }
}
