export class EntityManager {
  /**
   * Construct a new EntityManager for an entity.
   *
   * @param {Config} apiConfig
   * @param {Entity} entityClass
   */
  constructor(apiConfig, entityClass) {
    this.apiClient = apiConfig.getEndpoint();
    this.entityClass = entityClass;
    this.resource = entityClass;
  }

  get() {
    return [];
  }
}
