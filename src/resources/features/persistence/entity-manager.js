export class EntityManager {
  /**
   * Construct a new EntityManager for an entity.
   *
   * @param {Container} container
   * @param {Rest} api
   * @param {Entity} entityClass
   */
  constructor(container, api, entityClass) {
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

  find() {
    return this.api.find(this.entityClass.getResource())
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
    let entityData = {};
    for (let key in data) {
      // TODO: check associations
      entityData[key] = data[key];
    }
    Object.assign(entity, data);
    return entity;
  }
}
