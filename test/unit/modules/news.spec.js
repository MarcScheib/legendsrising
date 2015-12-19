import {Index} from '../../../src/view-models/news/index';
import {View} from '../../../src/view-models/news/view';

class NewsServiceStub {
  getRecent() {
    var response = this.itemStub;
    return new Promise((resolve) => {
      resolve(response);
    });
  }

  get(id) {
    var response = this.itemStub;
    return new Promise((resolve) => {
      resolve(response);
    });
  }
}

class NavModelStub {
  setTitle(title) {
    this.title = title;
  }
}

describe('the News Index module', () => {
  it('sets fetch response to news', (done) => {
    var newsService = new NewsServiceStub();
    var sut = new Index(newsService);

    var itemStubs = [1];
    var itemFake = [2];

    newsService.itemStub = itemStubs;
    sut.activate().then(() => {
      expect(sut.news).toBe(itemStubs);
      expect(sut.news).not.toBe(itemFake);
      done();
    });
  });
});

describe('the News View module', () => {
  it('sets fetch response to news', (done) => {
    var newsService = new NewsServiceStub();
    var sut = new View(newsService);

    var itemStubs = [1];

    newsService.itemStub = itemStubs;
    sut.activate({id: 1}, {navModel: new NavModelStub()}).then(() => {
      expect(sut.news).toBe(itemStubs);
      done();
    });
  });
});
