/* eslint-disable no-shadow */
import {PersistenceUnit} from './persistence-unit';

/**
 * Persistence feature configuration
 *
 * @export
 * @param {FrameworkConfiguration} frameworkConfig
 * @param {function} configure
 */
export function configure(frameworkConfig, configure) {
  // create a new instance of the PersistenceUnit
  let persistenceUnit = frameworkConfig.container.get(PersistenceUnit);

  // configure feature
  if (configure !== undefined && typeof configure === 'function') {
    configure(persistenceUnit);
  }
}

export {PersistenceUnit} from 'persistence-unit';
export {EntityManagerFactory} from 'entity-manager-factory';
export {EntityManager} from 'entity-manager';
export {Entity} from './entity';
