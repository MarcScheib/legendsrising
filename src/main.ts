import '../scss/style.scss';
import 'font-awesome/css/font-awesome.css';

import {Aurelia, LogManager} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {ConsoleAppender} from 'aurelia-logging-console';
import {Config} from 'aurelia-api';
import {BaseConfig} from 'aurelia-authentication';

import authConfig from './configuration/auth-config';
import {NavigationSettings} from './resources/features/navigation/navigation-settings';
import {PersistenceConfiguration} from './resources/features/persistence/persistence-configuration';

export async function configure(aurelia: Aurelia): Promise<void> {
  LogManager.addAppender(new ConsoleAppender());
  LogManager.setLevel(4); // TODO: env was used here before

  // Specify official libraries
  aurelia.use
    .defaultBindingLanguage()
    .defaultResources()
    .history()
    .router()
    .eventAggregator();

  // Specify official plugins
  aurelia.use
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-animator-css'));

  // Specify global resources
  aurelia.use
    .globalResources([PLATFORM.moduleName('resources/custom-elements/no-data')]);

  // Specify unofficial plugins
  aurelia.use
    .plugin(PLATFORM.moduleName('aurelia-api'), (config: Config) => {
      config
        .registerEndpoint('dev', 'http://localhost:3000/') // TODO: env was used here before
        .setDefaultEndpoint('dev');
    })
    .plugin(PLATFORM.moduleName('aurelia-authentication'), (config: BaseConfig) => {
      config.configure(authConfig);
    })
    .plugin(PLATFORM.moduleName('aurelia-notify'), (settings: any) => { // TODO: type from notify needed
      settings.containerSelector = '#notification-container';
      settings.timeout = 10000;
    });

  // Specify application features
  aurelia.use
    .feature(PLATFORM.moduleName('resources/features/navigation/index'), (settings: NavigationSettings) => {
      settings.maxWidthMobileNav = 992;
    })
    .feature(PLATFORM.moduleName('resources/features/data-list/index'))
    .feature(PLATFORM.moduleName('resources/features/persistence/index'), (persistenceConfiguration: PersistenceConfiguration) => {
      persistenceConfiguration.client = aurelia.container.get(Config).getEndpoint();
    });

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
