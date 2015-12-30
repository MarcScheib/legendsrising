import {ProfileService} from '../../../src/services/profiles/profile-service';

import {HttpServiceStub} from '../fixtures/HttpServiceStub';

var profileDummy = {
  user: 'Test'
};
var requestDummy = {
  json: function () {
    return profileDummy;
  }
};

describe('the Profile service', () => {
  var mockedHttpService;
  var sut;

  beforeEach(() => {
    mockedHttpService = new HttpServiceStub();
    sut = new ProfileService(mockedHttpService);
    mockedHttpService.requestDummy = requestDummy
  });

  it('contains a http service property', () => {
    expect(sut.httpClient).toBeDefined();
  });

  it('returns users based on ids', (done) => {
    sut.get(1)
      .then(resp => {
        expect(mockedHttpService.resource).toEqual('/profile/1');
        expect(resp).toEqual(profileDummy);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
