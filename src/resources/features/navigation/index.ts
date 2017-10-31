import { PLATFORM } from 'aurelia-pal';
import { globalSettings } from './nav-state';

export function configure(config, callback) {
  config.globalResources([
    PLATFORM.moduleName('./nav-toggler'),
    PLATFORM.moduleName('./navigation')
  ]);

  if (typeof callback === 'function') {
    callback(globalSettings);
  }
}
