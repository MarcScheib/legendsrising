export class EntityManager {
  /**
   * Construct a new EntityManager for an entity.
   *
   * @param {Rest} api
   * @param {Entity} entityClass
   */
  constructor(api, entityClass) {
    this.api = api;
    this.entityClass = entityClass;
  }

  get() {
    return [];
  }
}
