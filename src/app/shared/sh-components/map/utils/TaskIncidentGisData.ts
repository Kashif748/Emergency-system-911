/**
 * interface has task or incident info that will be saved in gis system.
 * refId --> is id of task or incident based on action that opened map.
 * title --> task or incident title.
 * orgName --> name of organization that task assigned to.
 * levelId --> task or incident levelId.
 * priorityId --> task or incident priority id.
 * dueDate --> task due date , for task only , incident not has due date.
 */
export interface TaskIncidentGisData {
  inc_ref_id?: number;
  type?: string;
  refId: number;
  title: string;
  orgName: string;
  levelId?: number;
  priorityId?: string;
  dueDate?: any;
  inc_category?: any;
  closeDate?: any;
  city?: any;
  creation_date?: any;
}
