import { transient } from 'aurelia-framework';
import { metadata } from 'aurelia-metadata';

@transient()
export class Entity {
  /**
   * Get the resource name of this entity's class reference.
   *
   * @return {string|null}
   */
  static getResource() {
    let meta: any = metadata.getOrCreateOwn(metadata.paramTypes, Map, this, this.name);
    return meta.get('resource');
  }

  /**
   * Metadata object of this entity.
   */
  _metadata;

  /**
   * Resource name of this entity.
   */
  _resource;

  /**
   * Construct a new entity.
   */
  constructor() {
    this._metadata = metadata.getOrCreateOwn(metadata.paramTypes, Map, this.constructor, this.constructor.name);
  }

  /**
   * Get the resource name of this entity.
   *
   * @return {string|null}
   */
  getResource() {
    return this._resource || this._metadata.get('resource');
  }

  /**
   * Set the resource name of this entity.
   *
   * @param {string} resource - the resource name of the entity.
   */
  setResource(resource) {
    this._resource = resource;
  }

  /**
   * Returns the associations of this entity.
   *
   * @return {object}
   */
  getAssociations() {
    return this._metadata.get('associations') || {};
  }
}
