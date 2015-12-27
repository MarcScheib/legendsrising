import {Index} from '../../../src/view-models/news/index';
import {View} from '../../../src/view-models/news/view';

class NewsServiceStub {
  reject = false;

  getRecent() {
    var response = this.itemStub;
    return new Promise((resolve, reject) => {
      if (this.reject == false) {
        resolve(response);
      } else {
        reject();
      }
    });
  }

  get(id) {
    var response = this.itemStub;
    return new Promise((resolve, reject) => {
      if (this.reject == false) {
        resolve(response);
      } else {
        reject();
      }
    });
  }
}

class NavModelStub {
  setTitle(title) {
    this.title = title;
  }
}

describe('the News Index module', () => {
  var newsService;
  var sut;

  var itemStubs = [{title: 'test'}];
  var itemFake = [2];

  beforeEach(() => {
    newsService = new NewsServiceStub();
    sut = new Index(newsService);
  });

  it('sets fetch response to news', done => {
    newsService.itemStub = itemStubs;
    sut.activate()
      .then(() => {
        expect(sut.news).toBe(itemStubs);
        expect(sut.news).not.toBe(itemFake);
        done();
      });
  });

  it('contains an empty list on API fail', done => {
    newsService.reject = true;
    sut.activate()
      .then(result => {
        expect(sut.news).toEqual([]);
        done();
      });
  });
});

describe('the News View module', () => {
  var newsService;
  var sut;

  var itemStubs = [1];
  var itemFake = [2];

  beforeEach(() => {
    newsService = new NewsServiceStub();
    sut = new View(newsService);
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
      });
  });

  it('sets selected news to null on API fail', done => {
    newsService.reject = true;
    let navModelStub = new NavModelStub();

    sut.activate({id: 1}, {navModel: navModelStub})
      .then(result => {
        expect(sut.news).toBe(null);
        done();
      });
  });
});
