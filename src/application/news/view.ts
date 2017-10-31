import { inject } from 'aurelia-framework';
import { RoutableComponentActivate, RouteConfig } from 'aurelia-router';
import { NotificationService } from 'aurelia-notify';

import { DataListController } from '../../resources/features/data-list/index';
import { LoggedInUser } from '../../resources/entities/logged-in-user';
import { EntityManagerFactory } from '../../resources/features/persistence/index';
import { NewsEntity } from '../../resources/entities/news-entity';
import { NewsCommentsService } from '../../services/news/news-comments-service';
import { EntityManager } from '../../resources/features/persistence/entity-manager';

const ENTER_KEY = 13;

@inject(EntityManagerFactory.of(NewsEntity), NewsCommentsService, NotificationService, LoggedInUser)
export class View implements RoutableComponentActivate {
  dataListController: DataListController;

  newsId: number = -1;
  news: NewsEntity;
  comment: any;
  comments: any[] = [];


  constructor(private entityManager: EntityManager,
              private newsCommentsService: NewsCommentsService,
              private notificationService: NotificationService,
              private loggedInUser: LoggedInUser) {
    this.dataListController = new DataListController(options => this.loadMore(options));
  }

  activate(params: any, routeConfig: RouteConfig) {
    this.newsId = params.id;

    return this.entityManager
      .findOne(params.id, {
        '_expand': 'user'
      })
      .then(news => {
        this.news = news;
        routeConfig.navModel.setTitle(news.title);
      })
      .catch(() => {
        this.news = null;
      });
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === ENTER_KEY) {
      this.addNewComment(this.comment);
    }
  }

  addNewComment(comment: any) {
    if (comment === undefined) {
      return;
    }

    comment = comment.trim();
    if (comment.length === 0) {
      return;
    }

    this.newsCommentsService
      .add(this.newsId, {'text': comment})
      .then(data => {
        this.comments.unshift(data);
        this.comment = null;
      })
      .catch((error) => {
        if (error.status === 401) {
          this.notificationService.danger('You are not allowed to post a comment without signing in.');
        }
      });
  }

  loadMore(page: number) {
    return this.newsCommentsService
      .getAll(this.newsId, page);
  }
}
