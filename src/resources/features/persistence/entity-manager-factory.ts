import { Container, resolver } from 'aurelia-framework';
import { PersistenceUnit } from './persistence-unit';
import { Entity } from './entity';
import { EntityManager } from './entity-manager';

@resolver()
export class EntityManagerFactory {
  entity: typeof Entity | string;

  /**
   * Get a new Entity Manager for `entity`.
   *
   * @param {function|string} entity - The entity class or name of the entity
   * @returns {EntityManagerFactory} Resolves to the Entity Manager for this entity
   */
  static of(entity: typeof Entity | string): EntityManagerFactory {
    return new EntityManagerFactory(entity);
  }

  /**
   * Get a new Entity Manager for `entity`.
   *
   * @param {function|string} entity - The entity class or name of the entity
   * @constructor
   */
  constructor(entity: typeof Entity | string) {
    this.entity = entity;
  }

  /**
   * Resolve an entity.
   *
   * @param {Container} container - Aurelia's DI container
   * @returns {EntityManager}
   */
  get(container: Container): EntityManager {
    return container.get(PersistenceUnit).getEntityManager(this.entity);
  }
}
