import {NewsService} from '../../../src/services/news/news-service';

import {EndpointServiceStub} from '../fixtures/EndpointServiceStub';

let newsDummy = {
  news: 'test'
};

describe('the News service', () => {
  let mockedEndpointService;
  let sut;

  beforeEach(() => {
    mockedEndpointService = new EndpointServiceStub();
    sut = new NewsService(mockedEndpointService);
    mockedEndpointService.requestDummy = newsDummy;
  });

  it('contains a http service property', () => {
    expect(sut.apiClient).toBeDefined();
  });

  it('returns all news', (done) => {
    mockedEndpointService.reject = false;
    sut.getAll()
      .then(resp => {
        expect(mockedEndpointService.resource).toEqual('news');
        expect(resp).toEqual(newsDummy);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('returns the selected news', (done) => {
    mockedEndpointService.reject = false;
    sut.get(1)
      .then(resp => {
        expect(mockedEndpointService.resource).toEqual('news');
        expect(mockedEndpointService.options).toEqual(1);
        expect(resp).toEqual(newsDummy);
        done();
      })
      .catch(result => {
        expect(result).not.toBe(result);
        done();
      });
  });

  it('rejects recent news on failure', (done) => {
    mockedEndpointService.reject = true;
    sut.getAll()
      .catch(result => {
        expect(mockedEndpointService.resource).toEqual('news');
        done();
      });
  });

  it('rejects selected news on failure', (done) => {
    mockedEndpointService.reject = true;
    sut.get(1)
      .catch(result => {
        expect(mockedEndpointService.resource).toEqual('news');
        expect(mockedEndpointService.options).toEqual(1);
        done();
      });
  });
});
