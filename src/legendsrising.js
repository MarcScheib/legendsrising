import {load} from 'aurelia-environment';
import {LogManager, DirtyCheckProperty} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import authConfig from './configuration/auth-config';

/** DEBUG DIRTY CHECKING **/
const logger = LogManager.getLogger('legendsrising');
DirtyCheckProperty.prototype.standardSubscribe = DirtyCheckProperty.prototype.subscribe;
DirtyCheckProperty.prototype.subscribe = function(context, callable) {
  this.standardSubscribe(context, callable);
  logger.warn(`'${this.obj.constructor.name}.${this.propertyName}' is being dirty checked`, this.obj);
};
/** /DEBUG DIRTY CHECKING **/

export function configure(aurelia) {
  return load()
    .then(() => {
      LogManager.addAppender(new ConsoleAppender());
      LogManager.setLevel(env.LOG_LEVEL);

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
        .globalResources(['resources/custom-elements/no-data']);

      // Specify unofficial plugins
      aurelia.use
        .plugin(PLATFORM.moduleName('aurelia-api'), config => {
          config
            .registerEndpoint('dev', env.API_ENDPOINT)
            .setDefaultEndpoint('dev');
        })
        .plugin(PLATFORM.moduleName('aurelia-authentication'), config => {
          config.configure(authConfig);
        })
        .plugin(PLATFORM.moduleName('aurelia-notify'), settings => {
          settings.containerSelector = '#notification-container';
          settings.timeout = 10000;
        });

      // Specify application features
      aurelia.use
        .feature('resources/features/navigation', settings => {
          settings.maxWidthMobileNav = 992;
        })
        .feature('resources/features/data-list')
        .feature('resources/features/persistence');

      aurelia.start()
        .then(a => a.setRoot(PLATFORM.moduleName('app'), document.body))
        .catch(() => {

        });
    })
    .catch(error => {
      console.error('Cannot load environment: ' + error.status + ' ' + error.statusText);
    });
}
