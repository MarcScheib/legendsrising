import { autoinject, Container } from 'aurelia-framework';

import { PersistenceConfiguration } from './persistence-configuration';
import { EntityManager } from './entity-manager';
import { Entity } from './entity';

/**
 * The Persistence Unit class. Creates entity managers based on entities for a specific endpoint.
 */
@autoinject()
export class PersistenceUnit {
  /**
   * Collection of configured entity managers.
   */
  entityManagers: { [x: string]: EntityManager } = {};

  /**
   * Collection of configured/seen entities.
   */
  entities: { [x: string]: typeof Entity } = {};

  /**
   * Constructs the Persistence Unit.
   *
   * @param {Container} container
   * @param {PersistenceConfiguration} config
   * @constructor
   */
  constructor(private container: Container,
              private config: PersistenceConfiguration) {
  }

  /**
   * Register an Entity class.
   *
   * @param {function} entityClass
   */
  registerEntity(entityClass: typeof Entity): void {
    if (typeof entityClass !== 'function') {
      throw new Error(`Can't register an entity of type ${typeof entityClass}. Expected function.`);
    }
    this.entities[entityClass.getResource()] = entityClass;
  }

  /**
   * Returns the entity manager of an entity class.
   *
   * @param {function|string} entity the entity class or name of the entity
   * @return {EntityManager} the corresponding entity manager
   */
  getEntityManager(entity: typeof Entity | string): EntityManager {
    if (!entity) {
      throw new Error(`Can't load an entity manager without an entity`);
    }

    const entityReference = this.resolveEntityReference(entity);
    let resource = entity;

    if (typeof entityReference.getResource === 'function') {
      resource = entityReference.getResource() || resource;
    }

    if (typeof resource !== 'string') {
      throw new Error('Unable to find resource for entity.');
    }

    let entityManager = this.entityManagers[resource];
    if (!entityManager) {
      // TODO: getEndpoint() has wrong type
      entityManager = new EntityManager(this, this.container, this.config.client, entityReference);
      this.entityManagers[resource] = entityManager;
    }
    return entityManager;
  }

  /**
   * Returns the class reference of an entity.
   *
   * @param {function|string} entity the entity class  or name of the entity
   * @return {Entity} the entity class resolved from the given class/name
   * @throws Error
   */
  resolveEntityReference(entity: typeof Entity | string): typeof Entity {
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
