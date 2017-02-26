import {metadata} from 'aurelia-metadata';

/**
 * Sets the 'resource' metadata on the entity.
 *
 * @param {string} resource The name of the resource
 * @return {function}
 * @decorator
 */
export function resource(resource) {
  return function(target) {
    target.resource = resource || target.name.toLowerCase();
    //console.log(metadata.getOwn(metadata.paramTypes, target));
    //metadata.getOrCreateOwn(Metadata.key, Metadata, target, target.name);
    //OrmMetadata.forTarget(target).put('resource', resource || target.name.toLowerCase());
  };
}
