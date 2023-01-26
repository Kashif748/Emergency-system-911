export interface IncidentSurveyConfig {
  id: number;
  nameAr: string;
  nameEn: string;
  moduleId?: number;
  types: any[];
  code: string;
  icon: string;
  active: boolean;
}

export interface IncidentSurveyType {
  id: number;
  nameAr: string;
  nameEn: string;
  label: string;
  icon: string;
  allowOthers?: boolean;
  score?: number;
}

export const SurveyConfigs: IncidentSurveyConfig[] = [
  {
    id: 1,
    nameAr: 'كفائة موظف الاتصال',
    nameEn: 'Communication Officer Efficiency',
    icon: '',
    code: '',
    active: true,
    types: [],
  },
  {
    id: 2,
    nameAr: 'سرعة الاستجابة للبلاغ',
    nameEn: 'Speed of response to the incident',
    icon: '',
    code: '',
    active: true,
    types: [],
  },
  {
    id: 3,
    nameAr: '',
    nameEn: '',
    icon: '',
    code: '',
    active: true,
    types: [],
  },
];

export interface SurveyBodyRequest {
  id?: number;
  incident?: any;
  incidentSurveyValues?: {
    id?: number;
    incidentSurveryId?: { id: number };
    surveyConfig: IncidentSurveyConfig;
    surveyType: IncidentSurveyType;
  }[];
  notes?: string;
}
