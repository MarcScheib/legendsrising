export class DataListController {
  dataCollector: (number) => any;

  constructor(dataCollector: (number) => any) {
    this.dataCollector = dataCollector;
  }

  fetchData(page) {
    return this.dataCollector(page);
  }
}
