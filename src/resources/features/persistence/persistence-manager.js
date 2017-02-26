import {inject} from 'aurelia-framework';
import {Config} from 'aurelia-api';
import {EntityManager} from './entity-manager';

/**
 * The Persistence Manager class. Creates entity managers based on entities.
 */
@inject(Config)
export class PersistenceManager {
  /**
   * Collection of configured entity managers.
   */
  entityManagers = {};

  /**
   * Construct the Persistence Manager.
   *
   * @param {Config} apiConfig
   * @constructor
   */
  constructor(apiConfig) {
    this.apiConfig = apiConfig;
  }

  /**
   * Returns the entity manager of an entity class.
   *
   * @param {Entity} entityClass the entity class
   * @return {EntityManager} the corresponding entity manager
   */
  getEntityManager(entityClass) {
    if (!entityClass) {
      throw new Error(`Can't load an entity manager without an entity`);
    }

    let entityManager = this.entityManagers[entityClass];
    if (!entityManager) {
      entityManager = new EntityManager(this.apiConfig, entityClass);
      this.entityManagers[entityClass] = entityManager;
    }
    return entityManager;
  }
}
