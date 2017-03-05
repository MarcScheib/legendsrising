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

  getEntity() {
    let instance = this.container.get(this.entityClass);
    instance.setResource(this.entityClass.getResource());
    return instance;
  }

  get() {
    return [];
  }
}
