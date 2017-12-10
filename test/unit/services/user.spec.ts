import {Container} from 'aurelia-framework';

import {UserService} from 'services/users/user-service';
import {RestStub} from '../fixtures/rest.stub';

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

  it('signs up new users', async () => {
    const resp: any = await sut.signUp(userDummy);
    expect(restStub.path).toEqual('users');
    expect(restStub.body).toEqual(userDummy);
    expect(resp.data[0]).toEqual(userDummy);
  });

  it('returns user based on username', async () => {
    const response: boolean = await sut.isUsernameExisting('Test');
    expect(restStub.path).toEqual('users?username=Test');
    expect(response).toBe(true);
  });

  it('returns user based on email', async () => {
    const response: boolean = await sut.isEmailExisting('Test@test.de');
    expect(restStub.path).toEqual('users?email=Test%40test.de');
    expect(response).toBeTruthy();
  });
});
