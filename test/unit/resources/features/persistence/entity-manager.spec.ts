import { Container } from 'aurelia-framework';

import { PersistenceUnit } from 'resources/features/persistence/persistence-unit';
import { EntityManager } from 'resources/features/persistence/entity-manager';
import { Entity } from 'resources/features/persistence/entity';

import { BaseEntity } from './fixtures/base-entity';
import { BarEntity } from './fixtures/bar-entity';
import { FaqEntity } from './fixtures/faq-entity';
import { WithAssociationsEntity } from './fixtures/with-associations-entity';
import { RestStub } from '../../../fixtures/rest.stub';

describe('EntityManager', () => {
  let container;
  let rest: RestStub;
  let sut: EntityManager;

  beforeEach(() => {
    container = new Container();
    rest = RestStub.createMock(container);
    sut = new EntityManager(container.get(PersistenceUnit), container, rest, FaqEntity);
  });

  describe('.getEntity()', () => {
    it('Should return a new `FaqEntity` instance.', () => {
      const entity = sut.getEntity();
      expect(entity instanceof FaqEntity).toBe(true);
      expect(entity.getResource()).toBe('faqs');
    });
  });

  describe('.find()', () => {
    it('Should create and return an array of `FaqEntity`.', (done: jest.DoneCallback) => {
      rest.requestDummy = [{}, {}];
      sut.find()
        .then((entities: Entity[]) => {
          expect(typeof entities).toBe('object');
          for (const entity of entities) {
            expect(entity instanceof FaqEntity).toBe(true);
          }
          done();
        });
    });
  });

  describe('.findOne()', () => {
    it('Should create and return a `FaqEntity`.', (done: jest.DoneCallback) => {
      rest.requestDummy = {};
      sut.findOne(1, {})
        .then((entity: Entity) => {
          expect(typeof entity).toBe('object');
          expect(entity instanceof FaqEntity).toBe(true);
          done();
        });
    });

    it('Should return a raw object.', (done: jest.DoneCallback) => {
      rest.requestDummy = {};
      sut.findOne(1, {}, true)
        .then((entity: Entity) => {
          expect(typeof entity).toBe('object');
          expect(entity instanceof FaqEntity).toBe(false);
          done();
        });
    });
  });

  describe('populateEntities()', () => {
    it('Should return an empty array if called without data', () => {
      const entities: Entity | Entity[] = sut.populateEntities(undefined);
      if (Array.isArray(entities)) {
        expect(typeof entities).toBe('object');
        expect(entities.length).toBe(0);
      }
    });
  });

  describe('populateEntity()', () => {
    it('Should resolve hasOne() associations', () => {
      const persistenceUnit = container.get(PersistenceUnit);
      persistenceUnit.registerEntity(BarEntity);
      sut = new EntityManager(persistenceUnit, container, rest, WithAssociationsEntity);
      const populatedEntity: any = sut.populateEntity({
        value1: 'something',
        base: {
          baseValue: 'anotherValue'
        },
        bar: {
          barValue: 'bar'
        },
        anotherBar: {
          barValue: 'still bar'
        }
      });

      expect(typeof populatedEntity).toBe('object');
      expect(populatedEntity instanceof WithAssociationsEntity).toBe(true);
      expect(populatedEntity.value1).toEqual('something');
      expect(typeof populatedEntity.base).toBe('object');
      expect(populatedEntity.base instanceof BaseEntity).toBe(true);
      expect(populatedEntity.base.baseValue).toEqual('anotherValue');
      expect(typeof populatedEntity.bar).toBe('object');
      expect(populatedEntity.bar instanceof BarEntity).toBe(true);
      expect(populatedEntity.bar.barValue).toEqual('bar');
      expect(typeof populatedEntity.anotherBar).toBe('object');
      expect(populatedEntity.anotherBar instanceof BarEntity).toBe(true);
      expect(populatedEntity.anotherBar.barValue).toEqual('still bar');
    });
  });
});
