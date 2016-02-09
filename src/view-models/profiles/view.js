import {inject} from 'aurelia-framework';
import {EntityManager} from 'aurelia-orm';

@inject(EntityManager)
export class View {
  constructor(entityManager) {
    this.profileRepository = entityManager.getRepository('profile');
  }

  activate(params, routeConfig) {
    return this.profileRepository.find(params.id)
      .then(profile => {
        this.profile = profile;
        routeConfig.navModel.setTitle('Profile of ' + profile.username);
      });
  }
}
