import {metadata} from 'aurelia-metadata';

export class Entity {
  /**
   * Construct a new entity.
   */
  constructor() {
    this._metadata = metadata.getOrCreateOwn(metadata.paramTypes, Map, this.constructor, this.constructor.name);
  }

  /**
   * Get the resource name of this entity's class reference.
   *
   * @return {string|null}
   */
  static getResource() {
    let meta = metadata.getOrCreateOwn(metadata.paramTypes, Map, this, this.name);
    return meta.get('resource');
  }

  /**
   * Get the resource name of this entity.
   *
   * @return {string|null}
   */
  getResource() {
    return this.resource;
  }
}
