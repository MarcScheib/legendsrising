import {Container, resolver} from 'aurelia-dependency-injection';

import {PersistenceManager} from './persistence-manager';

@resolver()
export class EntityManagerResolver {
  /**
   * Get a new Entity Manager for `entity`.
   *
   * @param {Entity|string} entity  The entity class or name of the entity
   * @constructor
   */
  constructor(entity) {
    this.entity = entity;
  }

  /**
   * Resolve an entity.
   *
   * @param {Container} container Aurelia's DI container
   * @return {EntityManager}
   */
  get(container) {
    return container.get(PersistenceManager).getEntityManager(this.entity);
  }

  /**
   * Get a new Entity Manager for `entity`.
   *
   * @param {Entity|string} entity  The entity class or name of the entity
   * @return {EntityManagerResolver}  Resolves to the Entity Manager for this entity
   */
  static of(entity) {
    return new EntityManagerResolver(entity);
  }
}
