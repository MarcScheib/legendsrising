import {NewsService} from '../../../src/services/news/news-service';

import {HttpServiceStub} from '../fixtures/HttpServiceStub';

var newsDummy = {
  news: 'test'
};
var requestDummy = {
  json: function () {
    return newsDummy;
  }
};

describe('the News service', () => {
  var mockedHttpService;
  var sut;

  beforeEach(() => {
    mockedHttpService = new HttpServiceStub();
    sut = new NewsService(mockedHttpService);
    mockedHttpService.requestDummy = requestDummy;
  });

  it('contains a http service property', () => {
    expect(sut.httpClient).toBeDefined();
  });

  it('returns recent news', (done) => {
    mockedHttpService.reject = false;
    sut.getRecent()
      .then(resp => {
        expect(mockedHttpService.resource).toEqual('/news');
        expect(resp).toEqual(newsDummy);
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
        expect(resp).toEqual(newsDummy);
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
