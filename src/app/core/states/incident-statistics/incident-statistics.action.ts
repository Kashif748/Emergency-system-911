export namespace IncidentStatisticsAction {
  export class LoadIncidentStatistics {
    static readonly type = '[IncidentStatistics] Load Incident statistics';
    /**
     *
     */
    constructor(
        public payload: {
          filters?: { [key: string]: any };
        }
    ) {}
  }
}
