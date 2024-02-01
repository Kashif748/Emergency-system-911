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
  export class LoadIncidentStatisticsCenters {
    static readonly type = '[IncidentStatistics] Load Incident statistics centers';
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
