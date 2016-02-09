import {inject} from 'aurelia-framework';
import {EntityManager} from 'aurelia-orm';
import {AuthService} from 'aurelia-auth';
import {NewsCommentsService} from '../../services/news/news-comments-service';

const ENTER_KEY = 13;

@inject(EntityManager, NewsCommentsService, AuthService)
export class View {
  constructor(entityManager, newsCommentsService, authService) {
    this.newsRepository = entityManager.getRepository('news');
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

    let commentsPromise = this.newsRepository.find(params.id + '/comments')
      .then(comments => {
        this.comments = comments;
      })
      .catch(() => {
        this.comments = [];
      });

    let newsPromise = this.newsRepository.find(params.id)
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
