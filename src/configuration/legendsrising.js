import {ViewLocator, LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';
import {HttpClient} from 'aurelia-fetch-client';
import {Configure} from 'aurelia-configuration';
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
    .plugin('aurelia-configuration', config => {
      config.setDirectory('dist/configuration');
      config.setConfig('application.json');
      config.setEnvironments({
        development: ['localhost'],
        staging: ['staging.legendsrising.de'],
        production: ['legendsrising.de']
      });
    })
    .plugin('aurelia-auth', baseConfig => {
      baseConfig.configure(authConfig);
    });

  aurelia.container.registerInstance(HttpClient, new HttpClient().configure(config => {
    config
      .withBaseUrl('http://lr.local/api')//configure.get('api.endpoint'))
      .withInterceptor({
        request(request) {
          console.log(`Requesting ${request.method} ${request.url}`);
          return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
        },
        response(response) {
          console.log(`Received ${response.status} ${response.url}`);
          return response; // you can return a modified Response
        }
      });
  }));

  aurelia.start().then(a => a.setRoot('view-models/app', document.body));
}
