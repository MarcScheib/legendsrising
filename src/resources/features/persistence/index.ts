import { FrameworkConfiguration } from 'aurelia-framework';
import { Config } from 'aurelia-api';

import { PersistenceUnit } from './persistence-unit';
import { PersistenceConfiguration } from './persistence-configuration';

/**
 * Persistence feature configuration
 *
 * @export
 * @param {FrameworkConfiguration} frameworkConfig
 * @param {function} [callback]
 */
export function configure(frameworkConfig: FrameworkConfiguration,
                          callback?: (persistenceConfiguration: PersistenceConfiguration) => void): void {
  const persistenceConfiguration: PersistenceConfiguration = frameworkConfig.container.get(PersistenceConfiguration);

  // configure feature
  if (callback !== undefined && typeof callback === 'function') {
    callback(persistenceConfiguration);
  } else {
    persistenceConfiguration.client = frameworkConfig.container.get(Config).getEndpoint();
  }
}

export { PersistenceUnit } from './persistence-unit';
export { EntityManagerFactory } from './entity-manager-factory';
export { EntityManager } from './entity-manager';
export { Entity } from './entity';
export { hasOne } from './decorator/has-one';
export { resource } from './decorator/resource';
