import {Container} from 'aurelia-framework';
import {Rest, Config} from 'aurelia-api';
import {EntityManager} from '../../../../../src/resources/features/persistence/entity-manager';
import {Entity} from '../../../../../src/resources/features/persistence/entity';
import {BaseEntity} from './fixtures/base-entity';

let baseUrls = {
  api: 'https://api.github.com'
};

describe('EntityManager', () => {
  let sut;

  beforeEach(() => {
    let container = new Container();
    let config = new Config();
    config.registerEndpoint('api', configure => {
      configure.withBaseUrl(baseUrls.api);
    });
    config.setDefaultEndpoint('api');

    sut = new EntityManager(container, config.getEndpoint(), BaseEntity);
  });

  describe('.getEntity()', () => {
    it('Should return a new `BaseEntity` instance.', () => {
      let entity = sut.getEntity();
      expect(entity instanceof BaseEntity).toBe(true);
      expect(entity.getResource()).toBe('baseentity');
    });
  });
});
