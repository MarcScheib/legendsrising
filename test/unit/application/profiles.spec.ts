import { View } from 'application/profile/view';

import { ProfileServiceStub } from '../fixtures/profile-service.stub';
import { RouteConfigStub } from '../fixtures/route-config.stub';

describe('Profiles', () => {
  describe('View', () => {
    let profileService;
    let sut: View;

    const itemStub = {username: 'test'};
    const itemFake = [2];

    beforeEach(() => {
      profileService = new ProfileServiceStub();
      sut = new View(profileService);
    });

    it('contains a profile service property', () => {
      expect(sut.userService).toBeDefined();
    });

    it('sets fetch response to selected profile', (done: jest.DoneCallback) => {
      profileService.itemStub = itemStub;
      const routeConfig = new RouteConfigStub();
      sut.activate({id: 1}, routeConfig)
        .then(() => {
          expect(sut.user).toBe(itemStub);
          expect(sut.user).not.toBe(itemFake);
          expect(routeConfig.navModel.title).toEqual('Profile of ' + itemStub.username);
        })
        .catch(() => {
          expect(true).toBeFalsy();
        })
        .then(done);
    });
  });
});
