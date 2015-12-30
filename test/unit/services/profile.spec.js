import {ProfileService} from '../../../src/services/profiles/profile-service';

import {HttpServiceStub} from '../fixtures/HttpServiceStub';

var mockedObject = {user: 'Test'};
var mockedRequest = {
  json: function() {
    return mockedObject;
  }
};

describe('the Profile service', () => {
  var mockedHttpService;
  var sut;

  beforeEach(() => {
    mockedHttpService = new HttpServiceStub();
    sut = new ProfileService(mockedHttpService);
    mockedHttpService.mockedRequest = mockedRequest
  });

  it('contains a http service property', () => {
    expect(sut.httpClient).toBeDefined();
  });

  it('returns users based on ids', (done) => {
    sut.get(1)
      .then(resp => {
        expect(mockedHttpService.resource).toEqual('/profile/1');
        expect(resp).toEqual(mockedObject);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
