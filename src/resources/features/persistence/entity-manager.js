export class EntityManager {
  /**
   * Construct a new EntityManager for an entity.
   *
   * @param {Rest} apiClient
   * @param {Entity} entityClass
   */
  constructor(apiClient, entityClass) {
    this.apiClient = apiClient.getEndpoint();
    this.entityClass = entityClass;
    this.resource = entityClass;
  }

  get() {
    return [];
  }
}
