import {Container, resolver} from 'aurelia-dependency-injection';

import {PersistenceManager} from './persistence-manager';

@resolver()
export class EntityManagerResolver {
  constructor(entityClass) {
    this.entityClass = entityClass;
  }

  /**
   * Resolve an entity.
   *
   * @param {Container} container
   * @return {EntityManager}
   */
  get(container) {
    return container.get(PersistenceManager).getEntityManager(this.entityClass);
  }

  /**
   * Get a new Entity Manager for `entity`.
   *
   * @param {Entity} entityClass  The entity class
   * @return {EntityManager}  Resolves to the Entity Manager for this entity
   */
  static of(entityClass) {
    return new EntityManagerResolver(entityClass);
  }
}
