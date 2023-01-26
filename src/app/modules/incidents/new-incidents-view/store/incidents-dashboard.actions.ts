import { DisplayedColumn, IncidentViewsEnum } from '../const';
import { createAction, props } from '@ngrx/store';
import { DisplayColumn } from '../../incidents.model';

export const SetPageNumber = createAction(
  '[INCIDENT DASHBOARD] Set Page Number',
  props<{ pageNumber: number }>()
);
export const SetCurrentView = createAction(
  '[INCIDENT DASHBOARD] Set Dashboard View',
  props<{ view: IncidentViewsEnum }>()
);

export const UpdateFilter = createAction(
  '[INCIDENT DASHBOARD] Set  Filter',
  props<{ filter: any }>()
);

export const SetIncidentsSelectedColumns = createAction(
  '[INCIDENT DASHBOARD] Set Incident  Selected Columns',
  props<{ selectedCols: DisplayedColumn[] }>()
);

export const SetInquiriesSelectedColumns = createAction(
  '[INCIDENT DASHBOARD] Set Inquiries  Selected Columns',
  props<{ selectedCols: DisplayedColumn[] }>()
);

export const SetInterimIncidentsSelectedColumns = createAction(
  '[INCIDENT DASHBOARD] Set Interim Incident  Selected Columns',
  props<{ selectedCols: DisplayedColumn[] }>()
);

export const UpdateLastRouterUrl = createAction(
  '[INCIDENT DASHBOARD] Update Last Router Url',
  props<{ url: string }>()
);

// export class UpdateInquiryFilter {
//   static readonly type = '[INCIDENT DASHBOARD] Set Inquiry Filter';
//   constructor(public payload: { filter: any }) {}
// }

// export class UpdateInterimIncidentFilter {
//   static readonly type = '[INCIDENT DASHBOARD] Set Interim Incident Filter';
//   constructor(public payload: { filter: any }) {}
// }
