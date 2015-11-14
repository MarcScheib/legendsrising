import {ViewLocator, LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import authConfig from 'configuration/auth-config';

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
    .plugin('aurelia-configuration', config => {
      config.setDirectory('assets/app/configuration');
      config.setConfig('application.json');
      config.setEnvironments({
        development: ['lr.local'],
        staging: ['staging.legendsrising.de'],
        production: ['legendsrising.de']
      });
    })
    .plugin('paulvanbladel/aurelia-auth', baseConfig => {
      baseConfig.configure(authConfig);
    });

  aurelia.start().then(a => a.setRoot('view-models/app', document.body));
}
