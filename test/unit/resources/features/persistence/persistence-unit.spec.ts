import { Container } from 'aurelia-framework';
import { Rest } from 'aurelia-api';

import { Entity, EntityManager, PersistenceUnit } from 'resources/features/persistence';

import { BaseEntity } from './fixtures/base-entity';
import { FooEntity } from './fixtures/foo-entity';
import { NoResourceEntity } from './fixtures/no-resource-entity';
import { RestStub } from '../../../fixtures/rest.stub';

describe('PersistenceUnit', () => {
  let sut: PersistenceUnit;

  beforeEach(() => {
    const container = new Container();
    RestStub.createMock(container);
    sut = container.get(PersistenceUnit);
  });

  describe('.registerEntity()', () => {
    it('Should register an entity in the manager', () => {
      sut.registerEntity(BaseEntity);
      expect(sut.entities).toEqual({'baseentity': BaseEntity});
    });

    it('Should throw an error when registering with a non-Entity', () => {
      expect(() => sut.registerEntity(null)).toThrowError(`Can't register an entity of type object. Expected function.`);
    });
  });

  describe('.getEntityManager()', () => {
    it('Should throw an error when called without an entity.', () => {
      expect(() => sut.getEntityManager(undefined)).toThrowError(`Can't load an entity manager without an entity`);
    });

    it('Should create and return the entity manager for an entity.', () => {
      const em: EntityManager = sut.getEntityManager(BaseEntity);
      expect(em).not.toBe(null);
      expect(em instanceof EntityManager).toBe(true);
      expect(em.api).not.toBe(null);
      expect(em.api instanceof Rest).toBe(true);
    });

    it('Should reuse entity managers for an entity.', () => {
      const em = sut.getEntityManager(BaseEntity);
      const baseEm = sut.getEntityManager(BaseEntity);
      const fooEm = sut.getEntityManager(FooEntity);
      expect(baseEm).toBe(em);
      expect(fooEm).not.toBe(em);
      expect(fooEm).not.toBe(baseEm);
    });

    it('Should create default entity manager for string.', () => {
      const em = sut.getEntityManager('test');
      expect(em).not.toBe(null);
      expect(em instanceof EntityManager).toBe(true);
      expect(sut.entityManagers).toEqual({'test': em});
    });

    it('Should throw an error if called with an entity without resource.', () => {
      expect(() => sut.getEntityManager(NoResourceEntity)).toThrowError('Unable to find resource for entity.');
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
      expect(() => sut.resolveEntityReference(null)).toThrowError('Unable to resolve to entity reference. Expected string or function.');
    });
  });
});
