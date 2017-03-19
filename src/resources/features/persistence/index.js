/* eslint-disable no-shadow */
import {PersistenceManager} from './persistence-manager';

/**
 * Persistence feature configuration
 *
 * @export
 * @param {FrameworkConfiguration} frameworkConfig
 * @param {function} configure
 */
export function configure(frameworkConfig, configure) {
  // create a new instance of the PersistenceManager
  let persistenceManager = frameworkConfig.container.get(PersistenceManager);

  // configure feature
  if (configure !== undefined && typeof configure === 'function') {
    configure(persistenceManager);
  }
}
