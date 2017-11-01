export class DataListController {
  dataCollector: (page: number) => any;

  constructor(dataCollector: (page: number) => any) {
    this.dataCollector = dataCollector;
  }

  fetchData(page: number) {
    return this.dataCollector(page);
  }
}
