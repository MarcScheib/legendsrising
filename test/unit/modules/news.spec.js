import {Index} from '../../../src/view-models/news/index';
import {View} from '../../../src/view-models/news/view';

import {AuthServiceStub} from '../fixtures/AuthServiceStub';
import {NavModelStub} from '../fixtures/NavModelStub';
import {NewsCommentsServiceStub} from '../fixtures/NewsCommentsServiceStub';
import {NewsServiceStub} from '../fixtures/NewsServiceStub';
import {NotificationServiceStub} from '../fixtures/NotificationServiceStub';

describe('the News Index module', () => {
  var newsService;
  var sut;

  var itemStubs = [{title: 'test'}];
  var itemFake = [2];

  beforeEach(() => {
    newsService = new NewsServiceStub();
    sut = new Index(newsService);
  });

  it('contains a news service property', () => {
    expect(sut.newsService).toBeDefined();
  });

  it('sets fetch response to news', done => {
    newsService.itemStub = { data: itemStubs };
    sut.activate()
      .then(() => {
        expect(sut.news).toBe(itemStubs);
        expect(sut.news).not.toBe(itemFake);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('contains an empty list on API fail', done => {
    newsService.reject = true;
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
  var newsService;
  var newsCommentsService;
  var authService;
  var notificationService;
  var sut;

  var itemStubs = [1];
  var itemFake = [2];

  beforeEach(() => {
    authService = new AuthServiceStub();
    newsService = new NewsServiceStub();
    newsCommentsService = new NewsCommentsServiceStub();
    notificationService = new NotificationServiceStub();
    sut = new View(newsService, newsCommentsService, authService, notificationService);
  });

  it('contains a news service property', () => {
    expect(sut.newsService).toBeDefined();
  });

  it('contains a news comments service property', () => {
    expect(sut.newsCommentsService).toBeDefined();
  });

  it('contains an auth service property', () => {
    expect(sut.authService).toBeDefined();
  });

  it('contains a notification service property', () => {
    expect(sut.notificationService).toBeDefined();
  });

  it('stores the news id on activation', done => {
    let navModelStub = new NavModelStub();

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
    newsService.itemStub = itemStubs;
    let navModelStub = new NavModelStub();

    sut.activate({id: 1}, {navModel: navModelStub})
      .then(() => {
        expect(sut.news).toBe(itemStubs);
        expect(sut.news).not.toBe(itemFake);
        expect(navModelStub.title).toEqual(itemStubs[0].title);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('sets selected news to null on API fail', done => {
    newsService.reject = true;
    let navModelStub = new NavModelStub();

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
