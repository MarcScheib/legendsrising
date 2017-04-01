export class EntityManager {
  /**
   * Construct a new EntityManager for an entity.
   *
   * @param {PersistenceManager} persistenceUnit
   * @param {Container} container
   * @param {Rest} api
   * @param {Entity} entityClass
   */
  constructor(persistenceUnit, container, api, entityClass) {
    this.persistenceUnit = persistenceUnit;
    this.container = container;
    this.api = api;
    this.entityClass = entityClass;
  }

  /**
   * Returns a new entity.
   */
  getEntity() {
    let instance = this.container.get(this.entityClass);
    instance.setResource(this.entityClass.getResource());
    return instance;
  }

  /**
   * Performs a query and populates entities based on the returned data.
   *
   * @param {{}|number|string} criteria - Criteria to add to the query. A plain string/number will be used as relative path.
   * @return {Promise<Entity|[Entity]>}
   */
  find(criteria) {
    return this.findResource(this.entityClass.getResource(), criteria);
  }

  /**
   * Performs a query on `resource` and populates entities based on the returned data.
   *
   * @param {string} resource - The resource to query
   * @param {{}|number|string} criteria - Criteria to add to the query. A plain string/number will be used as relative path.
   * @param {boolean} [raw] - Set to true to get a plain object instead of entities.
   * @return {Promise<Entity|[Entity]>}
   */
  findResource(resource, criteria, raw) {
    let result = this.api.find(resource, criteria);

    if (raw) {
      return result;
    }

    return result
      .then(response => {
        return this.populateEntities(response);
      });
  }

  /**
   * Populate entity of this manager with data returned from API.
   *
   * @param {[]} data - The data returned from the API.
   * @returns {Entity[]}
   */
  populateEntities(data) {
    if (!data) {
      return [];
    }

    if (!Array.isArray(data)) {
      return this.populateEntity(data);
    }

    let entities = [];
    data.forEach(entityData => {
      entities.push(this.populateEntity(entityData));
    });
    return entities;
  }

  /**
   * Populate an entity with the given data.
   *
   * @param {{}} data
   */
  populateEntity(data) {
    let entity = this.getEntity();
    let entityAssociations = entity.getAssociations();
    let entityData = {};
    for (let key in data) {
      let value = data[key];

      if (entityAssociations[key] && typeof value === 'object') {
        // TODO: those entities are dirty checked!!
        let associationEntityManager = this.persistenceUnit.getEntityManager(entityAssociations[key]);
        entityData[key] = associationEntityManager.populateEntity(value);
        continue;
      }

      entityData[key] = value;
    }
    Object.assign(entity, entityData);
    return entity;
  }
}
