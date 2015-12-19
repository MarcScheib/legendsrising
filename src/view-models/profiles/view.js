import {inject} from 'aurelia-framework';
import {ProfileService} from '../../services/profiles/profile-service';

@inject(ProfileService)
export class View {
  constructor(profileService) {
    this.profileService = profileService;
  }

  activate(params, routeConfig) {
    return this.profileService.get(params.id)
      .then(profile => {
        this.profile = profile;
        routeConfig.navModel.setTitle('Profile of ' + profile.username);
      });
  }
}
