export * from './controller';

export function configure(config) {
  config.globalResources([
    './data-list', './data-loader'
  ]);
}
