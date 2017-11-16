import { metadata } from 'aurelia-metadata';
import { Entity } from '../entity';

/**
 * Sets the 'resource' metadata on the entity.
 *
 * @param {string} resource - The name of the resource
 * @return {function}
 * @decorator
 */
export function resource(resource: string): (target: any) => void {
  return function <T extends typeof Entity>(target: T): void {
    const object: any = metadata.getOrCreateOwn(metadata.paramTypes, Map, target, target.name);
    object.set('resource', resource || target.name.toLowerCase());
  };
}
