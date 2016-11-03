import {inject} from 'aurelia-framework';
import {NotificationService} from 'aurelia-notify';
import {DataListController} from 'resources/features/data-list/controller';
import {LoggedInUser} from 'resources/entities/logged-in-user';
import {NewsService} from '../../services/news/news-service';
import {NewsCommentsService} from '../../services/news/news-comments-service';

const ENTER_KEY = 13;

@inject(NewsService, NewsCommentsService, NotificationService, LoggedInUser)
export class View {
  comments = [];

  constructor(newsService, newsCommentsService, notificationService, loggedInUser) {
    this.newsService = newsService;
    this.newsCommentsService = newsCommentsService;
    this.notificationService = notificationService;
    this.loggedInUser = loggedInUser;

    this.dataListController = new DataListController(options => this.loadMore(options));
  }

  activate(params, routeConfig) {
    this.newsId = params.id;

    return this.newsService.get(params.id)
      .then(news => {
        this.news = news;
        routeConfig.navModel.setTitle(news.title);
      })
      .catch(() => {
        this.news = null;
      });
  }

  onKeyUp(event) {
    if (event.keyCode === ENTER_KEY) {
      this.addNewComment(this.comment);
    }
  }

  addNewComment(comment) {
    if (comment === undefined) {
      return;
    }

    comment = comment.trim();
    if (comment.length === 0) {
      return;
    }

    this.newsCommentsService.add(this.newsId, {'text': comment})
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

  loadMore(page) {
    return this.newsCommentsService.getAll(this.newsId, page);
  }
}
