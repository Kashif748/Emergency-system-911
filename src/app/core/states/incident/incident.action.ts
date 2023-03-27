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
        id?: number;
      }
    ) {}
  }

  export class LoadPage {
    static readonly type = '[Incident] Load Page';
    /**
     *
     */
    constructor(
      public payload: {
        filters?: { [key: string]: any };
        sort?: string[];
        page: number;
        size: number;
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

  export class reOpenIncident {
    static readonly type = '[Incident] Open Incidint';
    /**
     *
     */
    constructor(public payload: { incidentId: number }) {}
  }

  export class GetIncident {
    static readonly type = '[Incident] Get Incident';
    /**
     *
     */
    constructor(
      public payload: {
        id?: number;
      }
    ) {}
  }
}
