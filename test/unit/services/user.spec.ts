import { Container } from 'aurelia-framework';

import { UserService } from 'services/users/user-service';
import { RestStub } from '../fixtures/rest.stub';

const userDummy = {
  user: 'Test'
};

describe('UserService', () => {
  let restStub: RestStub;
  let sut: UserService;

  beforeEach(() => {
    const container = new Container();
    restStub = container.get(RestStub);
    restStub.requestDummy = {
      'data': [userDummy]
    };
    sut = new UserService(restStub);
  });

  it('is created and initialized', () => {
    expect(sut).toBeTruthy();
    expect(sut.apiClient).toBeTruthy();
  });

  it('signs up new users', (done: jest.DoneCallback) => {
    sut.signUp(userDummy)
      .then(resp => {
        expect(restStub.path).toEqual('users');
        expect(restStub.body).toEqual(userDummy);
        expect(resp.data[0]).toEqual(userDummy);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('returns user based on username', (done: jest.DoneCallback) => {
    sut.isUsernameExisting('Test')
      .then((response: boolean) => {
        expect(restStub.path).toEqual('users?username=Test');
        expect(response).toBe(true);
        done();
      })
      .catch(() => {
        expect(true).toBe(false);
        done();
      });
  });

  it('returns user based on email', (done: jest.DoneCallback) => {
    sut.isEmailExisting('Test@test.de')
      .then((response: boolean) => {
        expect(restStub.path).toEqual('users?email=Test%40test.de');
        expect(response).toBeTruthy();
        done();
      })
      .catch(() => {
        expect(true).toBe(false);
        done();
      });
  });
});
