import {metadata} from 'aurelia-metadata';

/**
 * Associates a property with an entity.
 *
 * @param {undefined|string|Entity} association - The associated entity
 * @return {function}
 * @decorator
 */
export function hasOne(association) {
  return function(target, propertyName, descriptor) {
    if (!association) {
      association = propertyName;
    }

    let objectMetadata = metadata.getOrCreateOwn(metadata.paramTypes, Map, target.constructor, target.constructor.name);
    let associations = objectMetadata.get('associations');
    if (!associations) {
      associations = {};
      objectMetadata.set('associations', associations);
    }
    associations[propertyName] = association;
  };
}
