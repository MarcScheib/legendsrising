import {ProfileService} from '../../../src/services/profiles/profile-service';

import {EndpointServiceStub} from '../fixtures/EndpointServiceStub';

var profileDummy = {
  user: 'Test'
};

describe('the Profile service', () => {
  var mockedEndpointService;
  var sut;

  beforeEach(() => {
    mockedEndpointService = new EndpointServiceStub();
    sut = new ProfileService(mockedEndpointService);
    mockedEndpointService.requestDummy = profileDummy
  });

  it('contains a http service property', () => {
    expect(sut.apiClient).toBeDefined();
  });

  it('returns users based on ids', (done) => {
    sut.get(1)
      .then(resp => {
        expect(mockedEndpointService.resource).toEqual('profile');
        expect(mockedEndpointService.options).toEqual(1);
        expect(resp).toEqual(profileDummy);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
