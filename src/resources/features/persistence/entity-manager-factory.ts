import { Container, resolver } from 'aurelia-framework';
import { PersistenceUnit } from './persistence-unit';
import { Entity } from './entity';

@resolver()
export class EntityManagerFactory {
  /**
   * Get a new Entity Manager for `entity`.
   *
   * @param {Entity|string} entity - The entity class or name of the entity
   * @returns {EntityManagerFactory} Resolves to the Entity Manager for this entity
   */
  static of(entity) {
    return new EntityManagerFactory(entity);
  }

  entity: Entity;

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
  get(container: Container) {
    return container.get(PersistenceUnit).getEntityManager(this.entity);
  }
}
