import {View} from '../../../src/application/profile/view';

import {ProfileServiceStub} from '../fixtures/ProfileServiceStub';
import {NavModelStub} from '../fixtures/NavModelStub';

describe('the Profiles View module', () => {
  let profileService;
  let sut;

  let itemStub = {username: 'test'};
  let itemFake = [2];

  beforeEach(() => {
    profileService = new ProfileServiceStub();
    sut = new View(profileService);
  });

  it('contains a profile service property', () => {
    expect(sut.userService).toBeDefined();
  });

  it('sets fetch response to selected profile', done => {
    profileService.itemStub = itemStub;
    let navModelStub = new NavModelStub();

    sut.activate({id: 1}, {navModel: navModelStub})
      .then(() => {
        expect(sut.user).toBe(itemStub);
        expect(sut.user).not.toBe(itemFake);
        expect(navModelStub.title).toEqual('Profile of ' + itemStub.username);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
