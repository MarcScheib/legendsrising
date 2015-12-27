import {NewsService} from '../../../src/services/news/news-service';

var mockedRequest = {
  json: function() {
    return {news: 'test'};
  }
};

class HttpServiceStub {
  reject = false;

  fetch(resource) {
    this.resource = resource;

    return new Promise((resolve, reject) => {
      if (this.reject == false) {
        resolve(mockedRequest);
      } else {
        reject();
      }
    });
  }
}

describe('the News service', () => {
  var mockedHttpService;
  var sut;

  beforeEach(() => {
    mockedHttpService = new HttpServiceStub();
    sut = new NewsService(mockedHttpService);
  });

  it('contains a http service property', () => {
    expect(sut.httpClient).toBeDefined();
  });

  it('returns recent news', (done) => {
    mockedHttpService.reject = false;
    sut.getRecent()
      .then(resp => {
        expect(mockedHttpService.resource).toEqual('/news');
        expect(resp).toEqual({news: 'test'});
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('returns the selected news', (done) => {
    mockedHttpService.reject = false;
    sut.get(1)
      .then(resp => {
        expect(mockedHttpService.resource).toEqual('/news/1');
        expect(resp).toEqual({news: 'test'});
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('rejects recent news on failure', (done) => {
    mockedHttpService.reject = true;
    sut.getRecent()
      .catch(result => {
        expect(mockedHttpService.resource).toEqual('/news');
        done();
      });
  });

  it('rejects selected news on failure', (done) => {
    mockedHttpService.reject = true;
    sut.get(1)
      .catch(result => {
        expect(mockedHttpService.resource).toEqual('/news/1');
        done();
      });
  });
});
