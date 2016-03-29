import {ViewLocator, LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import authConfig from './auth-config';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);

ViewLocator.prototype.convertOriginToViewUrl = function(origin) {
  let moduleId = origin.moduleId;
  let id = (moduleId.endsWith('.js') || moduleId.endsWith('.ts')) ? moduleId.substring(0, moduleId.length - 3) : moduleId;
  return id.replace('view-models', 'views') + '.html';
};

export function configure(aurelia) {
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
        .registerEndpoint('dev', 'http://lr.local/api/')
        .setDefaultEndpoint('dev');
    })
    .plugin('aurelia-auth', config => {
      config.configure(authConfig);
    })
    .plugin('aurelia-notify', settings => {
      settings.containerSelector = '#notification-container';
      settings.timeout = 10000;
    });

  aurelia.start()
    .then(a => a.setRoot('view-models/app', document.body))
    .catch(() => {});
}
