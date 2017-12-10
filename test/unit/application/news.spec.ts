import {Container} from 'aurelia-framework';
import {NotificationService} from 'aurelia-notify';
import {AuthService} from 'aurelia-authentication';

import {LoggedInUser} from 'resources/entities/logged-in-user';
import {NewsCommentsService} from 'services/news/news-comments-service';
import {Index} from 'application/news/index';
import {View} from 'application/news/view';
import {NewsEntity} from 'resources/entities/news-entity';

import {NewsCommentsServiceStub} from '../fixtures/news-comments-service.stub';
import {NotificationServiceStub} from '../fixtures/notification-service.stub';
import {RestStub} from '../fixtures/rest.stub';
import {AuthServiceStub} from '../fixtures/auth-service.stub';
import {RouteConfigStub} from '../fixtures/route-config.stub';

describe('News', () => {
  describe('Index', () => {
    let container;
    let rest: RestStub;
    let sut: Index;

    beforeEach(() => {
      container = new Container();
      rest = RestStub.createMock(container);
      container.registerTransient(Index);
      sut = container.get(Index);
    });

    it('contains an entity manager property', () => {
      expect(sut.entityManager).toBeDefined();
    });

    it('sets fetch response to news', async () => {
      rest.requestDummy = [new NewsEntity()];
      await sut.activate();
      expect(sut.news).toBeDefined();
      expect(sut.news.length).toBe(1);
    });

    it('contains an empty list on API fail', async () => {
      rest.reject = true;
      await sut.activate();
      expect(sut.news).toEqual([]);
    });
  });

  describe('View', () => {
    let newsCommentsService;
    let notificationService;
    let container;
    let rest: RestStub;
    let sut: View;

    beforeEach(() => {
      newsCommentsService = new NewsCommentsServiceStub();
      notificationService = new NotificationServiceStub();
      container = new Container();
      rest = RestStub.createMock(container);
      container.registerSingleton(NewsCommentsService, NewsCommentsServiceStub);
      container.registerSingleton(NotificationService, NotificationServiceStub);
      container.registerSingleton(NotificationService, NotificationServiceStub);
      container.registerSingleton(AuthService, AuthServiceStub);
      container.registerSingleton(LoggedInUser);
      sut = container.get(View);
    });

    it('contains an entity manager property', () => {
      expect(sut.entityManager).toBeDefined();
    });

    it('contains a news comments service property', () => {
      expect(sut.newsCommentsService).toBeDefined();
    });

    it('contains a notification service property', () => {
      expect(sut.notificationService).toBeDefined();
    });

    it('stores the news id on activation', async () => {
      await sut.activate({id: 1}, new RouteConfigStub());
      expect(sut.newsId).toBe(1);
    });

    it('sets fetch response to selected news', async () => {
      const routeConfig = new RouteConfigStub();
      await sut.activate({id: 1}, routeConfig);
      expect(sut.news).toBeDefined();
      expect(routeConfig.navModel.title).toEqual(sut.news.title);
    });

    it('sets selected news to null on API fail', async () => {
      rest.reject = true;
      await sut.activate({id: 1}, new RouteConfigStub());
      expect(sut.news).toBe(null);
    });

    it('sets the comments to empty list on API fail', async () => {
      newsCommentsService.reject = true;
      await sut.activate({id: 1}, new RouteConfigStub());
      expect(sut.comments).toEqual([]);
    });
  });
});
