import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

import { NavigationSettings } from './navigation-settings';

export function configure(config: FrameworkConfiguration,
                          callback: (settings: NavigationSettings) => {}): void {
  config.globalResources([
    PLATFORM.moduleName('./nav-toggler'),
    PLATFORM.moduleName('./navigation')
  ]);

  const navSettings: NavigationSettings = config.container.get(NavigationSettings);
  if (typeof callback === 'function') {
    callback(navSettings);
  }
}
