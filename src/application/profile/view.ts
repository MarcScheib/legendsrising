import { autoinject } from 'aurelia-framework';
import { RoutableComponentActivate, RouteConfig } from 'aurelia-router';

import { UserService } from '../../services/users/user-service';
import { UserEntity } from '../../resources/entities/user-entity';

@autoinject()
export class View implements RoutableComponentActivate {
  user: any;

  constructor(public userService: UserService) {
  }

  activate(params: any, routeConfig: RouteConfig): Promise<void> {
    return this.userService.get(params.id)
      .then((user: UserEntity) => {
        this.user = user;
        routeConfig.navModel.setTitle('Profile of ' + user.username);
      });
  }
}
