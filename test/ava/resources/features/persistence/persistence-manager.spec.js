import test from 'ava';
import {Rest, Config} from 'aurelia-api';
import {PersistenceManager} from '../../../../../src/resources/features/persistence/persistence-manager';
import {EntityManager} from '../../../../../src/resources/features/persistence/entity-manager';
import {Entity} from '../../../../../src/resources/features/persistence/entity';
import {BaseEntity} from './fixtures/base-entity';
import {FooEntity} from './fixtures/foo-entity';

let baseUrls = {
  api: 'https://api.github.com'
};
let sut;

test.beforeEach(t => {
  let config = new Config();
  config.registerEndpoint('api', configure => {
    configure.withBaseUrl(baseUrls.api);
  });
  config.setDefaultEndpoint('api');
  sut = new PersistenceManager(config);
});

test('PersistenceManager.registerEntity() should register an entity in the manager', t => {
  sut.registerEntity(BaseEntity);
  t.is(sut.entities, {'baseentity': BaseEntity});
});

test('PersistenceManager.registerEntity() should throw an error when registering with a non-Entity', t => {
  const error = t.throws(() => {
    sut.registerEntity({});
  });
  t.is(error.message, `Can't register an entity of type object. Expected function.`);
});

test('PersistenceManager.getEntityManager() should create and return the entity manager for an entity.', t => {
  let em = sut.getEntityManager(BaseEntity);
  t.not(em, null);
  t.true(em instanceof EntityManager);
  t.not(em.apiClient, null);
  t.true(em.apiClient instanceof Rest);
});

test('PersistenceManager.getEntityManager() should reuse entity managers for an entity.', t => {
  let em = sut.getEntityManager(BaseEntity);
  let baseEm = sut.getEntityManager(BaseEntity);
  let fooEm = sut.getEntityManager(FooEntity);
  t.is(baseEm, em);
  t.not(fooEm, em);
  t.not(fooEm, baseEm);
});

test('PersistenceManager.getEntityManager() should create default entity manager for string.', t => {
  let em = sut.getEntityManager('test');
  t.not(em, null);
  t.true(em instanceof EntityManager);
  t.is(sut.entityManagers, {'test': em});
});

test('PersistenceManager.resolveEntityReference() should register and resolve to an entity itself.', t => {
  t.true(sut.resolveEntityReference(Entity) === Entity);
});

test('PersistenceManager.resolveEntityReference() should resolve to the default entity reference \'Entity\' on any string.', t => {
  t.true(sut.resolveEntityReference('test') === Entity);
});

test('PersistenceManager.resolveEntityReference() should throw an error on invalid input type.', t => {
  const error = t.throws(() => {
    sut.resolveEntityReference({});
  });
  t.is(error.message, 'Unable to resolve to entity reference. Expected string or function.');
});
