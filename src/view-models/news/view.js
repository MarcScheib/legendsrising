import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-authentication';
import {NotificationService} from 'aurelia-notify';
import {NewsService} from '../../services/news/news-service';
import {NewsCommentsService} from '../../services/news/news-comments-service';

const ENTER_KEY = 13;

@inject(NewsService, NewsCommentsService, AuthService, NotificationService)
export class View {
  loading = false;

  constructor(newsService, newsCommentsService, authService, notificationService) {
    this.newsService = newsService;
    this.newsCommentsService = newsCommentsService;
    this.authService = authService;
    this.notificationService = notificationService;
  }

  activate(params, routeConfig) {
    this.newsId = params.id;

    let userPromise = this.authService.getMe()
      .then(user => {
        this.user = user;
      })
      .catch(() => {
        this.user = null;
      });

    let commentsPromise = this.newsCommentsService.getAll(params.id)
      .then(comments => {
        this.comments = comments.data;
        this.currentPage = comments.current_page;
        this.lastPage = comments.last_page;
      })
      .catch(() => {
        this.comments = [];
      });

    let newsPromise = this.newsService.get(params.id)
      .then(news => {
        this.news = news;
        routeConfig.navModel.setTitle(news.title);
      })
      .catch(() => {
        this.news = null;
      });

    return Promise.all([userPromise, commentsPromise, newsPromise]);
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
          this.notificationService.danger('You are not allowed to post a comment without signing in.')
        }
      });
  }

  loadMore() {
    this.loading = true;
    this.newsCommentsService.getAll(this.newsId, this.currentPage + 1)
      .then(comments => {
        this.comments = this.comments.concat(comments.data);
        this.currentPage = comments.current_page;
        this.lastPage = comments.last_page;
        this.loading = false;
      })
      .catch(() => {
        this.comments = [];
        this.loading = false;
      });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
