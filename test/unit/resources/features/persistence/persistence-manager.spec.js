import {Rest, Config} from 'aurelia-api';
import {PersistenceManager} from '../../../../../src/resources/features/persistence/persistence-manager';
import {EntityManager} from '../../../../../src/resources/features/persistence/entity-manager';

import {BaseEntity} from './fixtures/base-entity';
import {FooEntity} from './fixtures/foo-entity';

let baseUrls = {
  api: 'https://api.github.com'
};

describe('PersistenceManager', function () {
  describe('.getEntityManager()', function () {
    it('Should create and return the entity manager for an entity.', function () {
      let config = new Config();
      let returned = config.registerEndpoint('api', function (configure) {
        configure.withBaseUrl(baseUrls.api);
      });
      config.setDefaultEndpoint('api');

      let manager = new PersistenceManager(config);
      let em = manager.getEntityManager(BaseEntity);

      expect(em).not.toBe(null);
      expect(em instanceof EntityManager).toBe(true);
      expect(em.apiClient).not.toBe(null);
      expect(em.apiClient instanceof Rest).not.toBe(null);


      let baseEm = manager.getEntityManager(BaseEntity);
      let fooEm = manager.getEntityManager(FooEntity);
      expect(baseEm).toBe(em);
      expect(fooEm).not.toBe(em);
      expect(fooEm).not.toBe(baseEm);
    });

    it('Should reuse entity managers for an entity.', function () {
      let config = new Config();
      let returned = config.registerEndpoint('api', function (configure) {
        configure.withBaseUrl(baseUrls.api);
      });
      config.setDefaultEndpoint('api');

      let manager = new PersistenceManager(config);
      let em = manager.getEntityManager(BaseEntity);
      let baseEm = manager.getEntityManager(BaseEntity);
      let fooEm = manager.getEntityManager(FooEntity);
      expect(baseEm).toBe(em);
      expect(fooEm).not.toBe(em);
      expect(fooEm).not.toBe(baseEm);
    });
  });
});
