export const SYSTEMS = [
  {
    id: '01',
    activity: 'Monday',
    activity_frq: 'test1',
    analysis_cycle: 'phaseOne',
    rto: 'test3',
    priority_level: 'none',
    status: 'hight',
    isActive: true,
  },
  {
    id: '02',
    activity: 'Tuesday',
    activity_frq: 'test1',
    analysis_cycle: 'phaseOne',
    rto: 'test3',
    priority_level: 'none',
    status: 'hight',
    isActive: true,
  },
  {
    id: '03',
    activity: 'wednesday',
    activity_frq: 'test1',
    analysis_cycle: 'phaseOne',
    rto: 'test3',
    priority_level: 'none',
    status: 'hight',
    isActive: true,
  },
  {
    id: '04',
    activity: 'thursday',
    activity_frq: 'test1',
    analysis_cycle: 'phaseOne',
    rto: 'test3',
    priority_level: 'none',
    status: 'hight',
    isActive: true,
  },
  {
    id: '05',
    activity: 'friday',
    activity_frq: 'test1',
    analysis_cycle: 'phaseOne',
    rto: 'test3',
    priority_level: 'none',
    status: 'hight',
    isActive: true,
  },
  {
    id: '06',
    activity: 'saturday',
    activity_frq: 'test1',
    analysis_cycle: 'phaseOne',
    rto: 'test3',
    priority_level: 'none',
    status: 'hight',
    isActive: true,
  },
  {
    id: '07',
    activity: 'sunday',
    activity_frq: 'test1',
    analysis_cycle: 'phaseOne',
    rto: 'test3',
    priority_level: 'none',
    status: 'hight',
    isActive: true,
  },
];

export const NOTES = [
  {
    label: 'تم انشاء مسودة تحليل أثر جديدة',
    user: 'اسم منسق الاستمرارية',
    manage: 'اسم الادارة',
    date: '2023/01/22  12:30 PM',
    type: 'مراحل التحديث',
  },
  {
    label: 'تم تحديث الاجزاء التالية: مصفوفة التأثيرات ، الاسترجاع',
    user: 'اسم منسق الاستمرارية',
    manage: 'اسم الادارة',
    date: '2023/01/22  12:30 PM',
    type: ' الملاحظات',
  },
  {
    label: 'تم تحديث الاجزاء التالية: مصفوفة التأثيرات ، الانظمة ، الاعتمادية',
    user: 'اسم منسق الاستمرارية',
    manage: 'اسم الادارة',
    date: '2023/01/23  11:10 PM',
    type: 'مراحل التحديث',
  },
  {
    label: 'يرجى اضافة وصف مفصل في قائمة الاسترجاع',
    user: 'اسم منسق الاستمرارية',
    manage: 'اسم الادارة',
    date: '2023/01/23  02:30 PM',
    type: ' الملاحظات',
  },
];

export const TABS = [
  {
    label: 'IMPACT_MATRIX',
    router: 'impact-matrix',
  },
  {
    label: 'RECOVERY',
    router: 'recovery',
  },
  {
    label: 'SYSTEMS',
    router: 'systems',
  },
  {
    label: 'EMPLOYEES',
    router: 'employees',
  },
  {
    label: 'DEPENDENCIES',
    router: 'dependencies',
  },
  {
    label: 'LOCATIONS',
    router: 'locations',
  },
  {
    label: 'NOTES',
    router: 'worklogs',
  },
];


actions: [
  // draft --> Under_review
  {
    nameAr: 'ارسال للمراجعة',
    nameEn: 'Send For Review',
    currentStatus: {
      id: 1,
      nameAr: 'مسودة',
      nameEn: 'draft',
    },
    targetStatus: {
      id: 4,
      nameAr: 'تحت المراجعة',
      nameEn: 'Under Review',
    },
  },

  // Under_review --> draft
  {
    nameAr: 'إعادة للتعديل',
    nameEn: 'Return For Modification',
    currentStatus: {
      id: 4,
      nameAr: 'تحت المراجعة',
      nameEn: 'Under Review',
    },
    targetStatus: {
      id: 1,
      nameAr: 'مسودة',
      nameEn: 'draft',
    },
  },

  // Under_review --> Under_Approval
  {
    nameAr: 'ارسال للاعتماد',
    nameEn: 'Send For upproval',
    currentStatus: {
      id: 2,
      nameAr: 'تحت المراجعة',
      nameEn: 'Under Review',
    },
    targetStatus: {
      id: 4,
      nameAr: 'تحت الإعتماد',
      nameEn: 'Under Approval',
    },
  },

  // Under_Approval -->  draft
  {
    nameAr: 'إعادة للتعديل',
    nameEn: 'Return For Modification',
    currentStatus: {
      id: 4,
      nameAr: 'تحت الإعتماد',
      nameEn: 'Under Approval',
    },
    targetStatus: {
      id: 1,
      nameAr: 'مسودة',
      nameEn: 'draft',
    },
  },

  // Under_Approval -->  Approved

  {
    nameAr: 'اعتماد',
    nameEn: 'Approve',
    currentStatus: {
      id: 4,
      nameAr: 'تحت الإعتماد',
      nameEn: 'Under Approval',
    },
    targetStatus: {
      id: 5,
      nameAr: 'معتمدة',
      nameEn: 'approved',
    },
  },
];
