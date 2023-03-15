import { PageRequestModel } from '@core/models/page-request.model';

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

  export class LoadPage {
    static readonly type = '[Incident] Load Page';
    /**
     *
     */
    constructor(public payload: PageRequestModel) {}
  }

  export class LoadOrgs {
    static readonly type = '[Incident] Load Orgs';
    /**
     *
     */
    constructor(public payload: { incidentId: number }) {}
  }

  export class reOpenIncident {
    static readonly type = '[Incident] Open Incidint';
    /**
     *
     */
    constructor(public payload: { incidentId: number }) {}
  }
}
