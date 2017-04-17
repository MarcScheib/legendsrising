export class DataListController {
  constructor(dataCollector) {
    this.dataCollector = dataCollector;
  }

  fetchData(page) {
    return this.dataCollector(page);
  }
}
