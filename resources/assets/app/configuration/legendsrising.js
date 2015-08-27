import {ConventionalViewStrategy, LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

LogManager.addAppender(new ConsoleAppender());
LogManager.setLevel(LogManager.logLevel.debug);

ConventionalViewStrategy.convertModuleIdToViewUrl = function(moduleId) {
    return moduleId.replace('view-models', 'views') + '.html';
};

export function configure(aurelia) {
    aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .history()
        .router()
        .eventAggregator()
        .plugin('aurelia-validation')
        .plugin('aurelia-animator-css');

    aurelia.start().then(a => a.setRoot('view-models/app', document.body));
}

