import { IncidentViewsEnum } from 'src/app/modules/incidents/new-incidents-view/const';

export interface DashboardStatistics {
  // IncidentsStatistics
  closedIncidents: number;
  delayedIncidents: number;
  interimIncidentsUnderEvaluation: number;
  openIncidents: number;
  registeredIncidents: number;
  // TasksStatistics
  delayedTasks: number;
  incomingTasks: number;
  outGoingTasks: number;
  // CorrespondenceStatistics
  delayedCorrespondence: number;
  incomingCorrespondence: number;
  // bc
  nationalCompliance: number;
  bcSectiondetails: [];
}
export interface DashboardBCStatistics {
  // bc
  currentAnalysisCycle: number;
  criticalActivities: number;
  criticalEmployees: number;
  criticalSystems: number;
}
export const data = {
  widget1: [
    {
      title: 'NATIONAL_PERCENTAGE',
      icon: 'Custome/ruler-combined-solid',
      value: 'nationalCompliance',
      color: 'text-dark-65',
      privileges: ['PRIV_VW_BC_LISTS'],
      changed: false,
    },
    {
      title: 'CURRENT_CYCLE',
      icon: 'Custome/magnifying-glass-chart-solid',
      value: 'currentAnalysisCycle',
      color: 'text-dark-65',
      privileges: ['PRIV_VW_BC_LISTS'],
      changed: false,
    },
    {
      title: 'CRITICAL_ACTIVITY',
      icon: 'Custome/heartbeat-solid',
      value: 'criticalActivities',
      color: 'text-dark-65',
      privileges: ['PRIV_VW_ORG_ACTIVITY'],
      changed: false,
    },
    {
      title: 'CRITICAL_EMPLOY',
      icon: 'Custome/person-rays-solid',
      value: 'criticalEmployees',
      color: 'text-dark-65',
      privileges: ['PRIV_VW_ORG_ACTIVITY'],
      changed: false,
    },
    {
      title: 'CRITICAL_SYSTEM',
      icon: 'Custome/laptop-code-solid',
      value: 'criticalSystems',
      color: 'text-dark-65',
      url: null,
      privileges: ['PRIV_VW_ORG_ACTIVITY'],
      changed: false,
    },
    {
      title: 'REGISTERED_INCIDENTS',
      icon: 'Custome/registered-incidents',
      value: 'registeredIncidents',
      color: 'text-primary',
      url: null,
      privileges: ['PRIV_VW_INC', 'PRIV_VW_GRP_INC'],
      changed: false,
    },
    {
      title: 'UNDER_EVALUATION_INCIDENTS',
      icon: 'Custome/under-evaluation-incidents',
      value: 'interimIncidentsUnderEvaluation',
      color: 'text-muted',
      url: '../incidents/dashboard/' + IncidentViewsEnum.INTERIM_INCIDENTS,
      privileges: ['PRIV_VW_INT_INC'],
      changed: false,
    },
    {
      title: 'IN_PROGRESS_INCIDENTS',
      icon: 'Custome/Group 1142',
      value: 'openIncidents',
      color: 'text-muted',
      url: '../incidents/dashboard/' + IncidentViewsEnum.IN_PROGRESS_INCIDENTS,
      privileges: ['PRIV_VW_INC', 'PRIV_VW_GRP_INC'],
      changed: false,
    },

    {
      title: 'LATE_INCIDENTS',
      icon: 'Custome/late-incidents',
      value: 'delayedIncidents',
      color: 'text-primary',
      url: null,
      privileges: ['PRIV_VW_INC', 'PRIV_VW_GRP_INC'],
      changed: false,
    },
    {
      title: 'COMPLETED_INCIDENTS',
      icon: 'Custome/completed-incidents',
      value: 'closedIncidents',
      color: 'text-primary',
      url: null,
      privileges: ['PRIV_VW_INC', 'PRIV_VW_GRP_INC'],
      changed: false,
    },

    // {
    //   title: 'INCOMING_TSKS',
    //   icon: 'Communication/Clipboard-list',
    //   value: 'incomingTasks',
    //   color: 'text-primary',
    //   url: '/incidents/tasks/incoming',
    //   privileges: ['PRIV_VW_TASK'],
    //   changed: false,
    // },
    // {
    //   title: 'OUTCOMING_TASKS',
    //   icon: 'Custome/daily-tasks',
    //   value: 'outGoingTasks',
    //   color: 'text-warning',
    //   url: '/incidents/tasks/outgoing',
    //   privileges: ['PRIV_VW_TASK'],
    //   changed : false

    // },
    {
      title: 'OUTDATE_TASKS',
      icon: 'Communication/Clipboard-list',
      value: 'delayedTasks',
      color: 'text-dark-75',
      url: '/incidents/tasks/incoming',
      changed: false,
    },
    {
      title: 'INCOMING_CORRERSPONDENCE',
      icon: 'Communication/Incoming-box',
      value: 'incomingCorrespondence',
      color: 'text-dark-65',
      url: '/correspondences-management/correspondences/incoming',
      privileges: ['PRIV_VW_PUB_CORR'],
      changed: false,
    },
    // {
    //   title: 'OUTCOMING_CORRERSPONDENCE',
    //   icon: 'Communication/Outgoing-box',
    //   value: 'delayedCorrespondence',
    //   color: 'text-dark-50',
    //   url: '/correspondences-management/correspondences/outgoing',
    //   changed : false

    // },
  ],
  widget2: [
    {
      title: 'LEVEL',
      value: 'level5',
      color: 'bg-light-warning text-warning',
      icon: 'Code/Warning-2',
      level: '5',
      url: '/incidents/incidents/level5',
    },
    {
      title: 'LEVEL',
      value: 'level4',

      color: 'bg-light-danger text-danger',
      icon: 'Design/Color-profile',
      level: '4',
      url: '/incidents/incidents/level4',
    },
    {
      title: 'LEVEL',
      value: 'level6',
      color: 'bg-light-primary text-primary',
      icon: 'Files/Download',
      level: '6',
      url: '/incidents/incidents/level6',
    },
    {
      title: 'LEVEL',
      value: 'level7',
      color: 'bg-light-success text-success',
      icon: 'General/Fire',
      level: '7',
      url: '/incidents/incidents/level7',
    },
  ],
  widget3: [
    {
      title: 'TASKS_STATUS',
      data: [
        {
          key: 'UNREADED',
          value: 30,
          color: 'bg-gray-800',
        },
        {
          key: 'COMPLETED',
          value: 70,
          color: 'bg-gray-500',
        },
        {
          key: 'REVIEWD',
          value: 50,
          color: 'bg-gray-600',
        },
      ],
    },
    {
      title: 'CORRERSPONDENCE_PRIORITY',
      data: [
        {
          key: 'VERY_URGENT',
          value: 20,
          color: 'bg-gray-800',
        },
        {
          key: 'URGENT',
          value: 40,
          color: 'bg-gray-500',
        },
        {
          key: 'NORMAL',
          value: 80,
          color: 'bg-gray-600',
        },
      ],
    },
    {
      title: 'INJUREDS',
      data: [
        {
          key: 'DANGER',
          value: 80,
          color: 'bg-gray-800',
        },
        {
          key: 'SIMPLE',
          value: 10,
          color: 'bg-gray-500',
        },
        {
          key: 'HARD',
          value: 50,
          color: 'bg-gray-600',
        },
      ],
    },
    {
      title: 'DANGER_EFFECT',
      data: [
        {
          key: 'DANGER',
          value: 30,
          color: 'bg-gray-800',
        },
        {
          key: 'MEDUIM',
          value: 30,
          color: 'bg-gray-500',
        },
        {
          key: 'NORMAL',
          value: 90,
          color: 'bg-gray-600',
        },
      ],
    },
  ],
};
