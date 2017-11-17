import {Container} from 'aurelia-framework';
import {Config, Rest} from 'aurelia-api';
import {PersistenceUnit} from '../../../../../src/resources/features/persistence/persistence-unit';
import {EntityManager} from '../../../../../src/resources/features/persistence/entity-manager';
import {BaseEntity} from './fixtures/base-entity';
import {BarEntity} from './fixtures/bar-entity';
import {FaqEntity} from './fixtures/faq-entity';
import {WithAssociationsEntity} from './fixtures/with-associations-entity';

let baseUrls = {
  api: 'http://localhost:3000/'
};

describe('EntityManager', () => {
  let container;
  let config;
  let sut;

  beforeEach(() => {
    container = new Container();
    config = new Config();
    config.registerEndpoint('api', configure => {
      configure.withBaseUrl(baseUrls.api);
    });
    config.setDefaultEndpoint('api');

    sut = new EntityManager(container.get(PersistenceUnit), container, config.getEndpoint(), FaqEntity);
  });

  describe('.getEntity()', () => {
    it('Should return a new `FaqEntity` instance.', () => {
      let entity = sut.getEntity();
      expect(entity instanceof FaqEntity).toBe(true);
      expect(entity.getResource()).toBe('faqs');
    });
  });

  describe('.find()', () => {
    it('Should create and return an array of `FaqEntity`.', done => {
      sut.find()
        .then(entities => {
          expect(typeof entities).toBe('object');
          for (let entity of entities) {
            expect(entity instanceof FaqEntity).toBe(true);
          }
          done();
        });
    });
  });

  describe('.findOne()', () => {
    it('Should create and return a `FaqEntity`.', done => {
      sut.findOne(1)
        .then(entity => {
          expect(typeof entity).toBe('object');
          expect(entity instanceof FaqEntity).toBe(true);
          done();
        });
    });

    it('Should return a raw object.', done => {
      sut.findOne(1, {}, true)
        .then(entity => {
          expect(typeof entity).toBe('object');
          expect(entity instanceof FaqEntity).toBe(false);
          done();
        });
    });
  });

  describe('populateEntities()', () => {
    it('Should return an empty array if called without data', () => {
      let entities = sut.populateEntities(undefined);
      expect(typeof entities).toBe('object');
      expect(entities.length).toBe(0);
    });
  });

  describe('populateEntity()', () => {
    it('Should resolve hasOne() associations', () => {
      let persistenceUnit = container.get(PersistenceUnit);
      persistenceUnit.registerEntity(BarEntity);
      sut = new EntityManager(persistenceUnit, container, config.getEndpoint(), WithAssociationsEntity);
      let populatedEntity = sut.populateEntity({
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
