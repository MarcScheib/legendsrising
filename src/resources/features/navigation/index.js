import {globalSettings} from './nav-state';

export function configure(config, callback) {
  config.globalResources([
    './nav-toggler',
    './navigation'
  ]);

  if (typeof callback === 'function') {
    callback(globalSettings);
  }
}
