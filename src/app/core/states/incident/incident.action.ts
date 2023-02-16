export namespace IncidentAction {
  export class LoadIncidents {
    static readonly type = '[Incident] Load Incidents';
    /**
     *
     */
    constructor(
      public payload: {
        status?: number[];
        subject?: string;
      }
    ) {}
  }

  export class LoadOrgs {
    static readonly type = '[Incident] Load Orgs';
    /**
     *
     */
    constructor(public payload: { incidentId: number }) {}
  }
}
