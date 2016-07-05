import {load} from 'aurelia-environment';
import {ViewLocator, LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import authConfig from './configuration/auth-config';

ViewLocator.prototype.convertOriginToViewUrl = function(origin) {
  let moduleId = origin.moduleId;
  let id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId;
  return id.replace('view-models', 'views') + '.html';
};

export function configure(aurelia) {
  return load()
    .then(() => {
      LogManager.addAppender(new ConsoleAppender());
      LogManager.setLevel(env.LOG_LEVEL);

      aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .history()
        .router()
        .eventAggregator()
        .plugin('aurelia-validation')
        .plugin('aurelia-animator-css')
        .plugin('aurelia-api', config => {
          config
            .registerEndpoint('dev', env.API_ENDPOINT)
            .setDefaultEndpoint('dev');
        })
        .plugin('aurelia-authentication', config => {
          config.configure(authConfig);
        })
        .plugin('aurelia-notify', settings => {
          settings.containerSelector = '#notification-container';
          settings.timeout = 10000;
        });

      aurelia.start()
        .then(a => a.setRoot('app', document.body))
        .catch(() => {

        });
    })
    .catch(error => {
      console.error('Cannot load environment: ' + error.status + ' ' + error.statusText);
    });
}
