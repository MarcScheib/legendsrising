import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, RouteConfig } from 'aurelia-router';

import { UserService } from '../../services/users/user-service';

@autoinject()
export class View implements RoutableComponentActivate {
  user: any;

  constructor(private userService: UserService) {
  }

  activate(params: any, routeConfig: RouteConfig) {
    return this.userService.get(params.id)
      .then(user => {
        this.user = user;
        routeConfig.navModel.setTitle('Profile of ' + user.username);
      });
  }
}
