import {inject} from 'aurelia-framework';
import {RoutableComponentActivate, RouteConfig} from 'aurelia-router';
import {NotificationService} from 'aurelia-notify';

import {EntityManager} from 'resources/features/persistence/entity-manager';
import {NewsCommentsService} from 'services/news/news-comments-service';
import {DataListController} from 'resources/features/data-list/index';
import {LoggedInUser} from 'resources/entities/logged-in-user';
import {EntityManagerFactory} from 'resources/features/persistence/index';
import {NewsEntity} from 'resources/entities/news-entity';

const ENTER_KEY = 13;

@inject(EntityManagerFactory.of(NewsEntity), NewsCommentsService, NotificationService, LoggedInUser)
export class View implements RoutableComponentActivate {
  dataListController: DataListController;

  newsId: number = -1;
  news: NewsEntity;
  comment: any;
  comments: any[] = [];

  constructor(public entityManager: EntityManager,
              public newsCommentsService: NewsCommentsService,
              public notificationService: NotificationService,
              public loggedInUser: LoggedInUser) {
    this.dataListController = new DataListController((page: number) => this.loadMore(page));
  }

  activate(params: any, routeConfig: RouteConfig): Promise<void> {
    this.newsId = params.id;

    return this.entityManager
      .findOne(params.id, {
        '_expand': 'user'
      })
      .then((news: NewsEntity) => {
        this.news = news;
        routeConfig.navModel.setTitle(news.title);
      })
      .catch(() => {
        this.news = null;
      });
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.keyCode === ENTER_KEY) {
      this.addNewComment(this.comment);
    }
  }

  addNewComment(comment: any): void {
    if (comment === undefined) {
      return;
    }

    comment = comment.trim();
    if (comment.length === 0) {
      return;
    }

    this.newsCommentsService
      .add(this.newsId, {'text': comment})
      .then((data: any) => {
        this.comments.unshift(data);
        this.comment = null;
      })
      .catch((error: any) => {
        if (error.status === 401) {
          this.notificationService.danger('You are not allowed to post a comment without signing in.');
        }
      });
  }

  loadMore(page: number): Promise<any> {
    return this.newsCommentsService
      .getAll(this.newsId, page);
  }
}
