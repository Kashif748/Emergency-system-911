import { PageRequestModel } from '@core/models/page-request.model';

export namespace ReopenAction {
  export class LoadIncidentsPage {
    static readonly type = '[ReopenAction] Load Incident Page';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }
  export class reOpenIncidint {
    static readonly type = '[ReopenAction] Open Incidint';
    /**
     *
     */
    constructor(public payload?: { incidentId: number }) {}
  }
  export class LoadTasksPage {
    static readonly type = '[ReopenAction] Load Task Page';
    /**
     *
     */
    constructor(public payload?: { pageRequest: PageRequestModel }) {}
  }

  export class UpdateTasksFilter {
    static readonly type = '[ReopenAction] Update Task filter';
    /**
     *
     */
    constructor(public payload: { clear?: boolean; [key: string]: any }) {}
  }

  export class reOpenTask {
    static readonly type = '[ReopenAction] Open Task';
    /**
     *
     */
    constructor(public payload?: { taskId: number }) {}
  }

  export class ChangeTab {
    static readonly type = '[ReopenAction] Change Tab';
    constructor(public payload: { tab: 'INCIDENTS' | 'TASKS' }) {}
  }
}
