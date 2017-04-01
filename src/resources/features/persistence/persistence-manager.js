import {Container, inject} from 'aurelia-framework';
import {Config} from 'aurelia-api';
import {EntityManager} from './entity-manager';
import {Entity} from './entity';

/**
 * The Persistence Unit class. Creates entity managers based on entities for a specific endpoint.
 */
@inject(Container, Config)
export class PersistenceManager {
  /**
   * Collection of configured entity managers.
   */
  entityManagers = {};

  /**
   * Collection of configured/seen entities.
   */
  entities = {};

  /**
   * Construct the Persistence Manager.
   *
   * @param {Container} container
   * @param {Config} apiConfig
   * @constructor
   */
  constructor(container, apiConfig) {
    this.container = container;
    this.apiConfig = apiConfig;
  }

  /**
   * Register an Entity class.
   *
   * @param {function} entityClass
   */
  registerEntity(entityClass) {
    if (typeof entityClass !== 'function') {
      throw new Error(`Can't register an entity of type ${typeof entityClass}. Expected function.`);
    }
    this.entities[entityClass.getResource()] = entityClass;
  }

  /**
   * Returns the entity manager of an entity class.
   *
   * @param {Entity|string} entity the entity class or name of the entity
   * @return {EntityManager} the corresponding entity manager
   */
  getEntityManager(entity) {
    if (!entity) {
      throw new Error(`Can't load an entity manager without an entity`);  // eslint-disable-line quotes
    }

    let entityReference = this.resolveEntityReference(entity);
    let resource = entity;

    if (typeof entityReference.getResource === 'function') {
      resource = entityReference.getResource() || resource;
    }

    if (typeof resource !== 'string') {
      throw new Error('Unable to find resource for entity.');
    }

    let entityManager = this.entityManagers[resource];
    if (!entityManager) {
      entityManager = new EntityManager(this, this.container, this.apiConfig.getEndpoint(), entityReference);
      this.entityManagers[resource] = entityManager;
    }
    return entityManager;
  }

  /**
   * Returns the class reference of an entity.
   *
   * @param {Entity|string} entity the entity class  or name of the entity
   * @return {Entity} the entity class resolved from the given class/name
   * @throws Error
   */
  resolveEntityReference(entity) {
    let entityReference = entity;
    if (typeof entity === 'string') {
      entityReference = this.entities[entity] || Entity;
    }

    if (typeof entityReference === 'function') {
      return entityReference;
    }

    throw new Error('Unable to resolve to entity reference. Expected string or function.');
  }
}
