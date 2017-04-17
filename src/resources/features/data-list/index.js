export function configure(config) {
  config.globalResources([
    './data-list', './data-loader'
  ]);
}

export * from './data-list-controller';
