import { metadata } from 'aurelia-metadata';
import { Entity } from '../entity';

/**
 * Associates a property with an entity.
 *
 * @param {string|Entity} [association] - The associated entity
 * @return {function}
 * @decorator
 */
export function hasOne(association?: string | typeof Entity): (target: any, propertyName: string) => void {
  return function (target: any, propertyName: string): void {
    if (!association) {
      association = propertyName;
    }

    const objectMetadata: any = metadata.getOrCreateOwn(metadata.paramTypes, Map, target.constructor, target.constructor.name);
    let associations: any = objectMetadata.get('associations');
    if (!associations) {
      associations = {};
      objectMetadata.set('associations', associations);
    }
    associations[propertyName] = association;
  };
}
