import {inject} from 'aurelia-framework';
import {RoutableComponentActivate, RouteConfig} from 'aurelia-router';

import {UserEntity} from 'resources/entities/user-entity';
import {EntityManager, EntityManagerFactory} from 'resources/features/persistence';

@inject(EntityManagerFactory.of(UserEntity))
export class View implements RoutableComponentActivate {
  user: UserEntity;

  constructor(public entityManager: EntityManager) {
  }

  activate(params: any, routeConfig: RouteConfig): Promise<void> {
    return this.entityManager.findOne(params.id)
      .then((user: UserEntity) => {
        this.user = user;
        routeConfig.navModel.setTitle('Profile of ' + user.username);
      });
  }
}
