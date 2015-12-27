import {json} from 'aurelia-fetch-client';

import {UserService} from '../../../src/services/users/user-service';
import {HttpServiceStub} from '../fixtures/HttpServiceStub';

var mockedObject = {user: 'Test'};
var mockedRequest = {
  json: function() {
    return mockedObject;
  }
};

describe('the User service', () => {
  var mockedHttpService;
  var sut;

  beforeEach(() => {
    mockedHttpService = new HttpServiceStub();
    sut = new UserService(mockedHttpService);
    mockedHttpService.mockedRequest = mockedRequest
  });

  it('contains a http service property', () => {
    expect(sut.httpClient).toBeDefined();
  });

  it('signs up new users', (done) => {
    sut.signUp(mockedObject)
      .then(resp => {
        expect(mockedHttpService.resource).toEqual('/user');
        expect(mockedHttpService.options).toEqual({
          method: 'post',
          body: json(mockedObject)
        });
        expect(resp).toEqual(mockedObject);
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
        expect(mockedHttpService.resource).toEqual('/user/usernameexist/Test');
        expect(resp).toEqual(mockedObject);
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
        expect(mockedHttpService.resource).toEqual('/user/emailexist/Test@test.de');
        expect(resp).toEqual(mockedObject);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
