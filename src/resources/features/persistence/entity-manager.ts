import {Container} from 'aurelia-framework';
import {Rest} from 'aurelia-api';

import {PersistenceUnit} from './persistence-unit';
import {Entity} from './entity';

export class EntityManager {
  /**
   * Construct a new EntityManager for an entity.
   *
   * @param {PersistenceUnit} persistenceUnit
   * @param {Container} container
   * @param {Rest} api
   * @param {typeof Entity} entityClass
   */
  constructor(public persistenceUnit: PersistenceUnit,
              public container: Container,
              public api: Rest,
              public entityClass: typeof Entity) {
  }

  /**
   * Returns a new entity.
   */
  getEntity(): Entity {
    const instance: Entity = this.container.get(this.entityClass);
    instance.setResource(this.entityClass.getResource());
    return instance;
  }

  /**
   * Performs a query and populates entities based on the returned data.
   *
   * @param {{}|number|string} [criteria] - Criteria to add to the query. A plain string/number will be used as relative path.
   * @param {boolean} [raw] - Set to true to get a plain object instead of entities.
   * @return {Promise<Entity|[Entity]>}
   */
  find(criteria?: {} | number | string, raw?: boolean): Promise<Entity | Entity[]> {
    const resourcePath = this.getResourcePath(this.entityClass, criteria);
    return this.findResource(resourcePath, criteria, raw);
  }

  /**
   * Performs a query for a single resource and populates an entity based on the returned data.
   *
   * @param {string} identifier - Identifier for the requested resource.
   * @param {{}|number|string} [criteria] - Criteria to add to the query. A plain string/number will be used as relative path.
   * @param {boolean} [raw] - Set to true to get a plain object instead of entities.
   * @returns {Promise<Entity|Entity[]>}
   */
  findOne(identifier: string | number, criteria?: {} | number | string, raw?: boolean): Promise<Entity | Entity[] | any> {
    const resourcePath = this.getResourcePath(this.entityClass, criteria);
    return this.findResource(resourcePath + '/' + identifier, criteria, raw, true);
  }

  /**
   * Performs a query on `resource` and populates entities based on the returned data.
   *
   * @param {string} resourcePath - The resource to query
   * @param {{}|number|string} criteria - Criteria to add to the query. A plain string/number will be used as relative path.
   * @param {boolean} [raw] - Set to true to get a plain object instead of entities.
   * @param {boolean} [single] - Set to true to get a single entity instead of a collection.
   * @return {Promise<Entity|[Entity]>}
   */
  findResource(resourcePath: string, criteria: {} | number | string, raw?: boolean, single?: boolean): Promise<Entity | Entity[] | any> {
    let result;
    if (single && typeof criteria === 'number') {
      result = this.api.findOne(resourcePath, criteria);
    } else {
      result = this.api.find(resourcePath, criteria);
    }

    if (raw) {
      return result;
    }

    return result
      .then((response: any) => this.populateEntities(response));
  }

  /**
   * Populate entity of this manager with data returned from API.
   *
   * @param {{}|[]} data - The data returned from the API.
   * @returns {Entity[]}
   */
  populateEntities(data: {} | any[]): Entity | Entity[] {
    if (!data) {
      return [];
    }

    if (!Array.isArray(data)) {
      return this.populateEntity(data);
    }

    const entities = [];
    data.forEach((entityData: any) => {
      entities.push(this.populateEntity(entityData));
    });
    return entities;
  }

  /**
   * Populate an entity with the given data.
   *
   * @param {{}} data
   */
  populateEntity(data: {}): Entity {
    const entity = this.getEntity();
    const entityAssociations = entity.getAssociations();
    const entityData = {};
    for (const key in data) {
      if (!data.hasOwnProperty(key)) {
        continue;
      }

      const value = data[key];
      if (entityAssociations[key] && typeof value === 'object') {
        // TODO: those entities are not observable right now!
        const associationEntityManager = this.persistenceUnit.getEntityManager(entityAssociations[key]);
        entityData[key] = associationEntityManager.populateEntity(value);
        continue;
      }

      entityData[key] = value;
    }
    Object.assign(entity, entityData);
    return entity;
  }

  /**
   * Creates the entities' resource path based on the resource name and path. If a path is specified,
   * it is resolved using the given criteria. The used parameter is removed from the criteria. If no path
   * is specified, the resource name is used.
   *
   * @param {typeof Entity} entityClass
   * @param {{}} [criteria] - Criteria to add to the query. A plain string/number will be used as relative path.
   * @returns {string}
   */
  getResourcePath(entityClass: typeof Entity, criteria?: {}): string {
    let resourcePath = entityClass.getResource();
    if (entityClass.getPath()) {
      resourcePath = entityClass.getPath();
    }
    return resourcePath;
  }
}
