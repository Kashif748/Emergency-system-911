import { MenuItem } from 'primeng/api';

export const TABS: MenuItem[] = [
  {
    label: 'RES_ORG',
    icon: 'flaticon2-protection',
    expanded: true,
    items: [
      {
        label: 'ORG_DETAILS',
        state: {
          routerLink: 'org/org-details',
          requiredVersion: false,
        },
      },

      {
        label: 'ORG_ARTCH',
        routerLinkActiveOptions: 'active-tab',
        state: {
          routerLink: 'org/org-strucure',
          requiredVersion: false,
        },
      },
    ],
  },
  {
    label: 'LOC_TYPE_LABEL',
    icon: 'pi pi-map-marker',
    state: {
      routerLink: 'loc-types',
      requiredVersion: false,
    },
  },
  {
    label: 'ACTIVETY_FREQUENCY',
    icon: 'flaticon2-refresh',
    state: {
      routerLink: 'activity-frequency',
      requiredVersion: false,
    },
  },

  { id: 'separator', separator: true },

  {
    label: 'IMPACTS',
    icon: 'flaticon-warning',

    items: [
      {
        label: 'IMPACT_LEVELS.TAB_LABEL',
        state: {
          routerLink: 'impact-level',
          requiredVersion: true,
        },
      },
      {
        label: 'IMPACT_ANALYSIS.TAB_LABEL',
        state: {
          routerLink: 'impact-analysis',
          requiredVersion: true,
        },
      },
    ],
  },
  {
    label: 'RTO_LIST_LABEL',
    icon: 'pi pi-clock',
    state: {
      routerLink: 'rto-list',
      requiredVersion: true,
    },
  },
  {
    label: 'AV_LEVELS',
    icon: 'pi pi-chart-bar',
    state: {
      routerLink: 'imp-level-working',
      requiredVersion: true,
    },
  },
  {
    label: 'RECVOVER_PRIORITIES',
    icon: 'pi pi-sort-amount-up',
    state: {
      routerLink: 'activity-priority',
      requiredVersion: true,
    },
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
      nameAr: 'منخفض جدا',
      nameEn: 'Very Low',
      isActive: false,
      colorCode: '#ffffff',
    },
    {
      id: 2,
      nameAr: 'منخفض',
      nameEn: 'Low',
      isActive: false,
      colorCode: '#ffffff',
    },
    {
      id: 3,
      nameAr: 'متوسط',
      nameEn: 'Medium',
      isActive: false,
      colorCode: '#ffffff',
    },
    {
      id: 4,
      nameAr: 'مرتفع',
      nameEn: 'High',
      isActive: false,
      colorCode: '#ffffff',
    },
    {
      id: 5,
      nameAr: 'مرتفع جدا',
      nameEn: 'Very High',
      isActive: false,
      colorCode: '#ffffff',
    },
  ],
  impactLevelsWorking: [
    { id: 1, color: '#1976D2', imp_level: 'phaseOne', desc: 'imp_level' },
    { id: 2, color: '#ff1a1a', imp_level: 'phaseTwo', desc: 'imp_level' },
    { id: 3, color: '#00ff00', imp_level: 'phaseTwo', desc: 'imp_levelt3' },
    { id: 4, color: '#ffff00', imp_level: 'phaseTwo', desc: 'imp_level3' },
    { id: 5, color: '#1976D2', imp_level: 'phaseTwo', desc: 'test3' },
  ],
  rtoList: [
    { id: 1, criticality: 'test1', rto: 'phaseOne', desc: 'test3' },
    { id: 2, criticality: 'test2', rto: 'phaseTwo', desc: 'test3' },
    { id: 3, criticality: 'test3', rto: 'phaseTwo', desc: 'test3' },
    { id: 4, criticality: 'test4', rto: 'phaseTwo', desc: 'test3' },
    { id: 5, criticality: 'test5', rto: 'phaseTwo', desc: 'test3' },
  ],
  locTypes: [
    { id: 1, type_ar: 'test1', type_en: 'phaseOne' },
    { id: 2, type_ar: 'test1', type_en: 'phaseOne' },
    { id: 3, type_ar: 'test1', type_en: 'phaseOne' },
    { id: 4, type_ar: 'test1', type_en: 'phaseOne' },
    { id: 5, type_ar: 'test1', type_en: 'phaseOne' },
  ],
  activityPrioritySeq: [
    { id: 1, priority_ar: 'test1', priority_en: 'phaseOne' },
    { id: 2, priority_ar: 'test1', priority_en: 'phaseOne' },
    { id: 3, priority_ar: 'test1', priority_en: 'phaseOne' },
    { id: 4, priority_ar: 'test1', priority_en: 'phaseOne' },
    { id: 5, priority_ar: 'peri', priority_en: 'phaseOne' },
  ],
  activityFrquency: [
    { id: 1, frq_ar: 'test1', feq_en: 'phaseOne' },
    { id: 2, frq_ar: 'test1', feq_en: 'phaseOne' },
    { id: 3, frq_ar: 'test1', feq_en: 'phaseOne' },
    { id: 4, frq_ar: 'test1', feq_en: 'phaseOne' },
    { id: 5, frq_ar: 'test1', feq_en: 'phaseOne' },
  ],
};
