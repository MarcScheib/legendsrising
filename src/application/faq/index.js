import {inject} from 'aurelia-framework';
import {FaqService} from '../../services/faqs/faq-service';

@inject(FaqService)
export class Index {
  constructor(faqService) {
    this.faqService = faqService;
    this.faqs = [];
  }

  activate() {
    return this.faqService.get()
      .then(faqs => {
        this.faqs = faqs;
      })
      .catch(() => {
        this.faqs = [];
      });
  }
}
