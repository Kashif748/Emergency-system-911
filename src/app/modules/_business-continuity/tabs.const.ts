import { MenuItem } from 'primeng/api';

export const TABS: MenuItem[] = [
  {
    label: 'RES_ORG',
    icon: 'flaticon2-protection',
    expanded: true,
    items: [
      {
        label: 'ORG_DETAILS',
        routerLink: 'org-details',
      },
      {
        label: 'ORG_ARTCH',
        routerLink: 'org-strucure',
        routerLinkActiveOptions: 'active-tab',
      },
    ],
  },
  {
    label: 'IMPACTS',
    icon: 'flaticon-warning',
    items: [
      {
        label: 'IMPACT_LEVELS.TAB_LABEL',
        routerLink: 'impact-levels',
      },
      { label: 'IMPACT_ANALYSIS.TAB_LABEL', routerLink: 'impact-analysis' },
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
    routerLink: 'imp-level-working',
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

export const DATA = {
  impactAnalysis: [
    {
      impactType: 'التأثير على السمعة',
      low: 'تعليقات سلبية على حسابات التواصل الاجتماعي',
      medium: 'خبر سلبي على مستوى الإذاعـة',
      high: ' خبر أو معلومـة أو صورة مقطع فيديو سلبي على مستوى وسائل..',
      action: '',
    },
    {
      impactType: 'التأثير على العملاء',
      low: 'التأخر عن تحقيق المستهدف التشغيلي (بنسبة أكبر من 20% ...',
      medium: 'التأخر عن تحقيق المستهدف التشغيلي (بنسبة أكبر من 50% ...',
      high: 'التأخر عن تحقيق المستهدف التشغيلي (بنسبة أكبر من 100%...',
      action: '',
    },
    {
      impactType: 'التأثير على العمليات',
      low: ' انخفاض رضا المتعاملين بنسبة بين 20٪ و50٪ لأي من الخدمات ...',
      medium: 'التأخر عن تحقيق المستهدف التشغيلي (بنسبة أكبر من 50% ...',
      high: 'انخفاض رضا المتعاملين بنسبة تفوق 100%  لأي من الخدمات ...',
      action: '',
    },
    {
      impactType: 'التأثير المالي',
      low: 'خسائر مالية بقيمة مليون درهم',
      medium: 'خسائر مالية من مليون إلى عشرة مليون درهم',
      high: 'خسائر مالية أكثر من عشرة مليون درهم',
      action: '',
    },
    {
      impactType: 'التأثير القانوني',
      low: 'رسالة تحذير (توعوية)',
      medium: 'التصالح: 50٪ أو 75٪',
      high: 'جزاء اداري / عقوبة',
      action: '',
    },
  ],
  impactLevels: [
    {
      id: 1,
      levelAr: 'منخفض جدا',
      levelEn: 'Very Low',
      color: {
        r: 100,
        g: 200,
        b: 100,
      },
    },
    {
      id: 2,
      levelAr: 'منخفض',
      levelEn: 'Low',
      color: {
        r: 100,
        g: 256,
        b: 30,
      },
    },
    {
      id: 3,
      levelAr: 'متوسط',
      levelEn: 'Medium',
      color: {
        r: 100,
        g: 100,
        b: 150,
      },
    },
    {
      id: 4,
      levelAr: 'مرتفع',
      levelEn: 'High',
      color: {
        r: 100,
        g: 100,
        b: 100,
      },
    },
    {
      id: 5,
      levelAr: 'مرتفع جدا',
      levelEn: 'Very High',
      color: {
        r: 100,
        g: 130,
        b: 0,
      },
    },
  ],
};
