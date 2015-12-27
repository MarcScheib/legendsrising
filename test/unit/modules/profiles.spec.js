import {View} from '../../../src/view-models/profiles/view';

class ProfileServiceStub {
  reject = false;

  get(id) {
    var response = this.itemStub;
    return new Promise((resolve, reject) => {
      if (this.reject == false) {
        resolve(response);
      } else {
        reject();
      }
    });
  }
}

class NavModelStub {
  setTitle(title) {
    this.title = title;
  }
}

describe('the Profiles View module', () => {
  var profileService;
  var sut;

  var itemStub = {username: 'test'};
  var itemFake = [2];

  beforeEach(() => {
    profileService = new ProfileServiceStub();
    sut = new View(profileService);
  });

  it('contains a profile service property', () => {
    expect(sut.profileService).toBeDefined();
  });

  it('sets fetch response to selected profile', done => {
    profileService.itemStub = itemStub;
    let navModelStub = new NavModelStub();

    sut.activate({id: 1}, {navModel: navModelStub})
      .then(() => {
        expect(sut.profile).toBe(itemStub);
        expect(sut.profile).not.toBe(itemFake);
        expect(navModelStub.title).toEqual('Profile of ' + itemStub.username);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
