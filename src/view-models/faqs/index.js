import {inject} from 'aurelia-framework';
import {EntityManager} from 'aurelia-orm';

@inject(EntityManager)
export class Index {
  constructor(entityManager) {
    this.faqRepository = entityManager.getRepository('faq');
    this.faqs = [];
  }

  activate() {
    return this.faqRepository.find()
      .then(faqs => {
        this.faqs = faqs;
      })
      .catch(() => {
        this.faqs = [];
      });
  }
}
