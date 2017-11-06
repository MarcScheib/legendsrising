export class DataListController {
  dataCollector: (page: number) => any;

  constructor(dataCollector: (page: number) => any) {
    this.dataCollector = dataCollector;
  }

  fetchData(page: number): any {
    return this.dataCollector(page);
  }
}
