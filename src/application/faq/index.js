import {inject} from 'aurelia-framework';
import {EntityManagerFactory} from '../../resources/features/persistence/index';
import {FaqEntity} from '../../resources/entities/faq-entity';

@inject(EntityManagerFactory.of(FaqEntity))
export class Index {
  constructor(entityManager) {
    this.entityManager = entityManager;
    this.faqs = [];
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
