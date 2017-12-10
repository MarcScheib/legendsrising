import {transient} from 'aurelia-framework';
import {metadata} from 'aurelia-metadata';

@transient()
export class Entity {
  /**
   * Metadata object of this entity.
   */
  _metadata: any;

  /**
   * Resource name of this entity.
   */
  _resource: string;

  /**
   * Path of this entity.
   */
  _path: string;

  /**
   * Get the resource name of this entity's class reference.
   *
   * @return {string|null}
   */
  static getResource(): string {
    const meta: any = metadata.getOrCreateOwn(metadata.paramTypes, Map, this, this.name);
    return meta.get('resource');
  }

  /**
   * Get the path of this entity's class reference.
   *
   * @return {string|null}
   */
  static getPath(): string {
    const meta: any = metadata.getOrCreateOwn(metadata.paramTypes, Map, this, this.name);
    return meta.get('path');
  }

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
  getResource(): string {
    return this._resource || this._metadata.get('resource');
  }

  /**
   * Set the resource name of this entity.
   *
   * @param {string} resource - the resource name of the entity.
   */
  setResource(resource: string): void {
    this._resource = resource;
  }

  /**
   * Get the path of this entity.
   *
   * @return {string|null}
   */
  getPath(): string {
    return this._path || this._metadata.get('path');
  }

  /**
   * Set the path of this entity.
   *
   * @param {string} path - the path of the entity.
   */
  setPath(path: string): void {
    this._path = path;
  }

  /**
   * Returns the associations of this entity.
   *
   * @return {object}
   */
  getAssociations(): {} {
    return this._metadata.get('associations') || {};
  }
}
