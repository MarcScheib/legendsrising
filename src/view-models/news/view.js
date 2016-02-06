import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {NewsService} from '../../services/news/news-service';
import {NewsCommentsService} from '../../services/news/news-comments-service';

const ENTER_KEY = 13;

@inject(NewsService, NewsCommentsService, AuthService)
export class View {
  constructor(newsService, newsCommentsService, authService) {
    this.newsService = newsService;
    this.newsCommentsService = newsCommentsService;
    this.authService = authService;
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

    let commentsPromise = this.newsCommentsService.getRecent(params.id)
      .then(comments => {
        this.comments = comments;
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

    this.newsCommentsService.add(this.newsId, {'text': comment}).then(data => {
      this.comments.push(data);
      this.comment = null;
    });
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
