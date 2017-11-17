import {Container} from 'aurelia-framework';
import {Config} from 'aurelia-api';

import {NotificationService} from 'aurelia-notify';
import {LoggedInUser} from 'resources/entities/logged-in-user';
import {NewsCommentsService} from '../../../src/services/news/news-comments-service';

import {Index} from '../../../src/application/news/index';
import {View} from '../../../src/application/news/view';

import {NavModelStub} from '../fixtures/nav-model.stub';
import {NewsCommentsServiceStub} from '../fixtures/news-comments-service.stub';
import {NotificationServiceStub} from '../fixtures/notification-service.stub';
import {setupApi} from '../fixtures/api-helper';

describe('the News Index module', () => {
  let container;

  beforeEach(() => {
    container = new Container();
    setupApi(container);
    container.registerTransient(Index);
  });

  it('contains an entity manager property', () => {
    let sut = container.get(Index);
    expect(sut.entityManager).toBeDefined();
  });

  it('sets fetch response to news', done => {
    let sut = container.get(Index);
    sut.activate()
      .then(() => {
        expect(sut.news).toBeDefined();
        expect(sut.news.length).toBeGreaterThan(0);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('contains an empty list on API fail', done => {
    let apiConfig = container.get(Config);
    apiConfig.setDefaultEndpoint('apiFail');
    let sut = container.get(Index);
    sut.activate()
      .then(result => {
        expect(sut.news).toEqual([]);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});

describe('the News View module', () => {
  let newsCommentsService;
  let notificationService;
  let container;

  beforeEach(() => {
    newsCommentsService = new NewsCommentsServiceStub();
    notificationService = new NotificationServiceStub();
    container = new Container();
    setupApi(container);
    container.registerSingleton(NewsCommentsService, NewsCommentsServiceStub);
    container.registerSingleton(NotificationService, NotificationServiceStub);
    container.registerSingleton(LoggedInUser);
    container.registerTransient(View);
  });

  it('contains an entity manager property', () => {
    let sut = container.get(View);
    expect(sut.entityManager).toBeDefined();
  });

  it('contains a news comments service property', () => {
    let sut = container.get(View);
    expect(sut.newsCommentsService).toBeDefined();
  });

  it('contains a notification service property', () => {
    let sut = container.get(View);
    expect(sut.notificationService).toBeDefined();
  });

  it('stores the news id on activation', done => {
    let navModelStub = new NavModelStub();
    let sut = container.get(View);
    sut.activate({id: 1}, {navModel: navModelStub})
      .then(() => {
        expect(sut.newsId).toBe(1);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('sets fetch response to selected news', done => {
    let navModelStub = new NavModelStub();
    let sut = container.get(View);
    sut.activate({id: 1}, {navModel: navModelStub})
      .then(() => {
        expect(sut.news).toBeDefined();
        expect(navModelStub.title).toEqual(sut.news.title);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('sets selected news to null on API fail', done => {
    let apiConfig = container.get(Config);
    apiConfig.setDefaultEndpoint('apiFail');
    let navModelStub = new NavModelStub();
    let sut = container.get(View);
    sut.activate({id: 1}, {navModel: navModelStub})
      .then(result => {
        expect(sut.news).toBe(null);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('sets the comments to empty list on API fail', done => {
    newsCommentsService.reject = true;
    let navModelStub = new NavModelStub();
    let sut = container.get(View);
    sut.activate({id: 1}, {navModel: navModelStub})
      .then(result => {
        expect(sut.comments).toEqual([]);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });
});
