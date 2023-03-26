import { MenuItem } from 'primeng/api';

export const TABS: MenuItem[] = [
  {
    label: 'RES_ORG',
    icon: 'flaticon2-protection',
    items: [
      {
        label: 'ORG_INFO',
        routerLink: 'org-details',
      },
      { label: 'ORG_ARTCH', routerLink: 'org-strucure' ,
      routerLinkActiveOptions : 'active-one'},
    ],
  },
  {
    label: 'EFFECTS',
    icon: 'flaticon-warning',
    items: [
      {
        label: 'EFFECTS_LEVELS',
      },
      { label: 'EFFECTS_MATRIX' },
    ],
  },
  {
    label: 'HEAL_TIME_LIST',
    icon: 'pi pi-clock',
    routerLink :'rto-list'
  },
  {
    label: 'AV_LEVELS',
    icon: 'pi pi-chart-bar',
  },
  {
    label: 'RECVOVER_PRIORITIES',
    icon: 'pi pi-sort-amount-up',
    routerLink:'activey-priority'
  },
  {
    label: 'LOC_TYPE_LABEL',
    icon: 'pi pi-map-marker',
    routerLink:'loc-types'
  },
  {
    label: 'ACTIVETY_CYCLE',
    icon: 'flaticon2-refresh',
    routerLink:'activey-frquency'
  },
];
