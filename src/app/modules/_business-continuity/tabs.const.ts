import { MenuItem } from 'primeng/api';

export const TABS: MenuItem[] = [
  {
    label: 'RES_ORG',
    icon: 'flaticon2-protection',
    items: [
      {
        label: 'ORG_DETAILS',
        routerLink: 'org-details',
      },
      {
        label: 'ORG_ARTCH',
        routerLink: 'org-strucure',
        routerLinkActiveOptions: 'active-one',
      },
    ],
  },
  {
    label: 'IMPACTS',
    icon: 'flaticon-warning',
    items: [
      {
        label: 'IMPACT_LEVELS',
        routerLink: 'impact-levels',
      },
      { label: 'IMPACT_ANALYSIS', routerLink: 'impact-analysis' },
    ],
  },
  {
    label: 'RTO_LIST_LABEL',
    icon: 'pi pi-clock',
    routerLink: 'rto-list',
  },
  {
    label: 'AV_LEVELS',
    icon: 'pi pi-chart-bar',
  },
  {
    label: 'RECVOVER_PRIORITIES',
    icon: 'pi pi-sort-amount-up',
    routerLink: 'activey-priority',
  },
  {
    label: 'LOC_TYPE_LABEL',
    icon: 'pi pi-map-marker',
    routerLink: 'loc-types',
  },
  {
    label: 'ACTIVETY_FREQUENCY',
    icon: 'flaticon2-refresh',
    routerLink: 'activey-frquency',
  },
];
