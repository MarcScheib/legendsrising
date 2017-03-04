import {Rest, Config} from 'aurelia-api';
import {PersistenceManager} from '../../../../../src/resources/features/persistence/persistence-manager';
import {EntityManager} from '../../../../../src/resources/features/persistence/entity-manager';
import {Entity} from '../../../../../src/resources/features/persistence/entity';
import {BaseEntity} from './fixtures/base-entity';
import {FooEntity} from './fixtures/foo-entity';

let baseUrls = {
  api: 'https://api.github.com'
};

describe('PersistenceManager', () => {
  let sut;

  beforeEach(() => {
    let config = new Config();
    config.registerEndpoint('api', configure => {
      configure.withBaseUrl(baseUrls.api);
    });
    config.setDefaultEndpoint('api');

    sut = new PersistenceManager(config);
  });

  describe('.registerEntity()', () => {
    it('Should register an entity in the manager', () => {
      sut.registerEntity(BaseEntity);
      expect(sut.entities).toEqual({'baseentity': BaseEntity});
    });

    it('Should throw an error when registering with a non-Entity', () => {
      expect(() => {
        sut.registerEntity({});
      }).toThrowError(Error, `Can't register an entity of type object. Expected function.`);
    });
  });

  describe('.getEntityManager()', () => {
    it('Should create and return the entity manager for an entity.', () => {
      let em = sut.getEntityManager(BaseEntity);
      expect(em).not.toBe(null);
      expect(em instanceof EntityManager).toBe(true);
      expect(em.apiClient).not.toBe(null);
      expect(em.apiClient instanceof Rest).toBe(true);
    });

    it('Should reuse entity managers for an entity.', () => {
      let em = sut.getEntityManager(BaseEntity);
      let baseEm = sut.getEntityManager(BaseEntity);
      let fooEm = sut.getEntityManager(FooEntity);
      expect(baseEm).toBe(em);
      expect(fooEm).not.toBe(em);
      expect(fooEm).not.toBe(baseEm);
    });


    it('Should create default entity manager for string.', () => {
      let em = sut.getEntityManager('test');
      expect(em).not.toBe(null);
      expect(em instanceof EntityManager).toBe(true);
      expect(sut.entityManagers).toEqual({'test': em});
    });
  });

  describe('.resolveEntityReference()', () => {
    it(`Should register and resolve to an entity itself.`, () => {
      expect(sut.resolveEntityReference(Entity) === Entity).toBe(true);
    });

    it(`Should resolve to the default entity reference 'Entity' on any string.`, () => {
      expect(sut.resolveEntityReference('test') === Entity).toBe(true);
    });

    it('Should throw an error on invalid input type.', () => {
      expect(() => {
        sut.resolveEntityReference({});
      }).toThrowError(Error, 'Unable to resolve to entity reference. Expected string or function.');
    });
  });
});
