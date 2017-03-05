import {Container, resolver} from 'aurelia-framework';

import {PersistenceManager} from './persistence-manager';

@resolver()
export class EntityManagerFactory {
  /**
   * Get a new Entity Manager for `entity`.
   *
   * @param {Entity|string} entity - The entity class or name of the entity
   * @constructor
   */
  constructor(entity) {
    this.entity = entity;
  }

  /**
   * Resolve an entity.
   *
   * @param {Container} container - Aurelia's DI container
   * @returns {EntityManager}
   */
  get(container) {
    return container.get(PersistenceManager).getEntityManager(this.entity);
  }

  /**
   * Get a new Entity Manager for `entity`.
   *
   * @param {Entity|string} entity - The entity class or name of the entity
   * @returns {EntityManagerFactory} Resolves to the Entity Manager for this entity
   */
  static of(entity) {
    return new EntityManagerFactory(entity);
  }
}
