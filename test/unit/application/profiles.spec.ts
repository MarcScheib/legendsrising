import {Container} from 'aurelia-framework';

import {View} from 'application/profile/view';
import {UserEntity} from 'resources/entities/user-entity';

import {RouteConfigStub} from '../fixtures/route-config.stub';
import {RestStub} from '../fixtures/rest.stub';

describe('Profiles', () => {
  describe('View', () => {
    let container: Container;
    let rest: RestStub;
    let sut: View;

    beforeEach(() => {
      container = new Container();
      rest = RestStub.createMock(container);
      container.registerTransient(View);
      sut = container.get(View);
    });

    it('contains an entity manager property', () => {
      expect(sut.entityManager).toBeDefined();
    });

    it('sets fetch response to selected profile', async () => {
      const user = new UserEntity();
      user.username = 'Marc';
      rest.requestDummy = user;
      const routeConfig = new RouteConfigStub();
      await sut.activate({id: 1}, routeConfig);
      expect(sut.user).toBeDefined();
      expect(sut.user.username).toEqual(user.username);
      expect(routeConfig.navModel.title).toEqual('Profile of ' + user.username);
    });
  });
});
