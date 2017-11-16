import { FrameworkConfiguration } from 'aurelia-framework';

import { PersistenceUnit } from './persistence-unit';

/**
 * Persistence feature configuration
 *
 * @export
 * @param {FrameworkConfiguration} frameworkConfig
 * @param {function} [callback]
 */
export function configure(frameworkConfig: FrameworkConfiguration,
                          callback?: (persistenceUnit: PersistenceUnit) => void): void {
  // create a new instance of the PersistenceUnit
  const persistenceUnit = frameworkConfig.container.get(PersistenceUnit);

  // configure feature
  if (callback !== undefined && typeof callback === 'function') {
    callback(persistenceUnit);
  }
}

export { PersistenceUnit } from './persistence-unit';
export { EntityManagerFactory } from './entity-manager-factory';
export { EntityManager } from './entity-manager';
export { Entity } from './entity';
