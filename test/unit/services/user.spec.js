import {json} from 'aurelia-fetch-client';
import {UserService} from '../../../src/services/users/user-service';
import {EndpointServiceStub} from '../fixtures/EndpointServiceStub';

var userDummy = {
  user: 'Test'
};

describe('the User service', () => {
  var mockedEndpointService;
  var sut;

  beforeEach(() => {
    mockedEndpointService = new EndpointServiceStub();
    sut = new UserService(mockedEndpointService);
    mockedEndpointService.requestDummy = {
      'data': [userDummy]
    }
  });

  it('contains a http service property', () => {
    expect(sut.apiClient).toBeDefined();
  });

  it('signs up new users', (done) => {
    sut.signUp(userDummy)
      .then(resp => {
        expect(mockedEndpointService.resource).toEqual('users');
        expect(mockedEndpointService.options).toEqual(userDummy);
        expect(resp).toEqual(userDummy);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('returns user based on username', (done) => {
    sut.isUsernameExisting('Test')
      .then(resp => {
        expect(mockedEndpointService.resource).toEqual('users');
        expect(mockedEndpointService.options).toEqual({
          'username': 'Test'
        });
        expect(resp).toEqual(userDummy);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('returns user based on email', (done) => {
    sut.isEmailExisting('Test@test.de')
      .then(resp => {
        expect(mockedEndpointService.resource).toEqual('users');
        expect(mockedEndpointService.options).toEqual({
          'email': 'Test@test.de'
        });
        expect(resp).toEqual(userDummy);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
