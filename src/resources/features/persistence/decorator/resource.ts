import { metadata } from 'aurelia-metadata';
import { Entity } from '../entity';

/**
 * Sets the 'resource' metadata on the entity.
 *
 * @param {string} [resourceName] - The name of the resource. If not specified, the lower cased class name is used.
 * @param {string} [resourcePath] - The API path used to request entities. If not defined, the resource name is used.
 * @return {function}
 * @decorator
 */
export function resource(resourceName?: string, resourcePath?: string): (target: any) => void {
  return function <T extends typeof Entity>(target: T): void {
    const object: any = metadata.getOrCreateOwn(metadata.paramTypes, Map, target, target.name);
    object.set('resource', resourceName || target.name.toLowerCase());
    object.set('path', resourcePath);
  };
}
