import {inject} from 'aurelia-framework';
import {UserService} from '../../services/users/user-service';

@inject(UserService)
export class View {
  constructor(userService) {
    this.userService = userService;
  }

  activate(params, routeConfig) {
    return this.userService.get(params.id)
      .then(user => {
        this.user = user;
        routeConfig.navModel.setTitle('Profile of ' + user.username);
      });
  }
}
