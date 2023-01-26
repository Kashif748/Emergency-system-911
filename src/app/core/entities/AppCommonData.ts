export interface City {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  municipalityAr: string;
  municipalityEn: string;
  createdAt?: any;
  updatedAt?: any;
  createdBy?: any;
  updatedBy?: any;
}

export interface EmergencyLevel {
  id: number;
  isActive: boolean;
  level: string;
}

export interface IncidentStatu {
  id: number;
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
}

export interface InterimIncidentStatuses {
  id: number;
  nameAr: string;
  nameEn: string;
  order: number;
  isActive: boolean;
}

export interface ReportingVia {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
}

export interface IncidentRiskImpact {
  id: number;
  nameAR: string;
  nameEN: string;
  isActive: boolean;
}

export interface Hospital {
  id: number;
  nameAR: string;
  nameEN: string;
  isActive: boolean;
  plotNumber: string;
}

export interface EnviromentalImpact {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
}

export interface EntityTag {
  id: number;
  entityLabel: string;
  tag: string;
  description?: any;
  fieldId?: any;
  allowMulti: boolean;
  isActive: boolean;
}

export interface Rank {
  id: number;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
}

export interface CircularStatu {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
}

export interface LibraryCategory {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
}

export interface EntityType {
  entityType: string;
  labelEn: string;
  labelAr: string;
  id: number;
}

export interface Parent {
  id: number;
}

export interface CurrentOrgDetails {
  code: string;
  theme: number;
  representativeGroupId?: any;
  nameAr: string;
  nameEn: string;
  center?: any;
  sector?: any;
  entityType: EntityType;
  contractorContractNo?: any;
  contractorExpDate?: any;
  specialistId?: any;
  managerId?: any;
  themeReason: string;
  area?: any;
  adcdaClassifcation?: any;
  loginOtp: boolean;
  loginUaePass: boolean;
  loginNormal: boolean;
  ldapOrgId?: any;
  managerGroupId?: any;
  tradeLicense?: any;
  loginCaptcha: boolean;
  adcdaPrimary?: any;
  parent: Parent;
  location?: any;
  id: number;
}

export interface DailySummaryReportStatu {
  id: number;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
}

export interface ExerciseStatu {
  nameAr: string;
  nameEn: string;
  id: number;
}

export interface CurrentGroupDetail {
  nameAr: string;
  nameEn: string;
  id: number;
}

export interface CorrespondenceStatu {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
}

export interface ReferenceKpi {
  id: number;
  label: string;
}

export interface CreatedBy {
  id: number;
  label: string;
}

export interface UpdatedBy {
  id: number;
  label: string;
}

export interface PriorityResponse {
  id: number;
  label: string;
}

export interface IncidentCategory {
  id: number;
  label: string;
}

export interface Kpi {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  descriptionEn: string;
  descriptionAr: string;
  period: number;
  version: number;
  createdAt: string;
  updatedAt: string;
  deActivationDate: string;
  referenceKpi: ReferenceKpi;
  createdBy: CreatedBy;
  updatedBy: UpdatedBy;
  priority: Priority;
  incidentCategory: IncidentCategory;
}

export interface CreatedBy2 {
  id: number;
  label: string;
}

export interface UpdatedBy2 {
  id: number;
  label: string;
}

export interface Contractor {
  id: number;
  label: string;
}

export interface Group {
  id: number;
  label: string;
}

export interface Sla {
  id: number;
  isActive: boolean;
  contractExpiryDate: string;
  contractNo: string;
  centerName: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedBy2;
  updatedBy: UpdatedBy2;
  contractor: Contractor;
  kpi?: any;
  group: Group;
}

export interface TaskStatu {
  id: number;
  nameAr: string;
  nameEn: string;
  orderNumber: number;
  active: boolean;
}

export interface OrgStructure {
  nameAr: string;
  nameEn: string;
  id: number;
}

export interface Priority {
  orgStructure: OrgStructure;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  color: string;
  id: number;
}

export interface TaskType {
  id: number;
  nameAr: string;
  nameEn: string;
  active: boolean;
}

export interface Parent2 {
  id: number;
  label: string;
}

export interface OrgStructure2 {
  id: number;
  label: string;
}

export interface IncidentCategory2 {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  parent: Parent2;
  orgStructure: OrgStructure2;
  serialNumber: number;
}

export interface Mobile {
  id: number;
  mobile: string;
  main: boolean;
}

export interface CurrentUserDetails {
  userName: string;
  mobile: string;
  isActive: boolean;
  title: string;
  email: string;
  firstNameEn: string;
  middleNameEn: string;
  lastNameEn: string;
  firstNameAr: string;
  middleNameAr: string;
  lastNameAr: string;
  emiratesId: string;
  mobiles: Mobile[];
  rankId?: any;
  photo: string;
  onDuty: boolean;
  id: number;
}

export interface DailySumariesReportOptType {
  id: number;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
}

export interface ExerciseCommitteeRole {
  nameAr: string;
  nameEn: string;
  id: number;
}

export interface ExerciseMemberRole {
  nameAr: string;
  nameEn: string;
  id: number;
}

export interface Organization {
  id: number;
  label: string;
}

export interface AssetsGroup {
  id: number;
  nameAr: string;
  nameEn: string;
  organization: Organization;
  isActive: boolean;
}

export interface Organization2 {
  id: number;
}

export interface AssetsMainCategory {
  nameAr: string;
  nameEn: string;
  isActive: boolean;
  id: number;
}

export interface AssetsCategory {
  icon: string;
  organization: Organization2;
  nameAr: string;
  nameEn: string;
  assetsMainCategory: AssetsMainCategory;
  isActive: boolean;
  color: string;
  id: number;
}

export interface OperationalReportStatu {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
}

export interface CreatedBy3 {
  id: number;
  label: string;
}

export interface UpdatedBy3 {
  id: number;
  label: string;
}

export interface Confidentialty {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  createdAt: string;
  updatedAt: string;
  createdBy: CreatedBy3;
  updatedBy: UpdatedBy3;
}

export interface ExerciseType {
  nameAr: string;
  nameEn: string;
  id: number;
}

export interface NewsType {
  id: number;
  nameAr: string;
  nameEn: string;
  isActive: boolean;
}

export interface ParentPrivilage {
  id: number;
  label: string;
}

export interface Privilege {
  id: number;
  actiontypeId?: any;
  active: boolean;
  descAr: string;
  descEn: string;
  nameAr: string;
  nameEn: string;
  moduleId: number;
  parentPrivilage: ParentPrivilage;
  code: string;
}

export interface LibraryAccessType {
  id: number;
  nameAr: string;
  nameEn: string;
  privilege: Privilege;
}

export interface Reason {
  id: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
}

export interface AppCommonData {
  cities: City[];
  emergencyLevels: EmergencyLevel[];
  userSystemId: number;
  incidentStatus: IncidentStatu[];
  reportingVias: ReportingVia[];
  interimIncidentStatuses: InterimIncidentStatuses[];
  incidentRiskImpacts: IncidentRiskImpact[];
  hospitals: Hospital[];
  enviromentalImpacts: EnviromentalImpact[];
  entityTags: EntityTag[];
  ranks: Rank[];
  circularStatus: CircularStatu[];
  libraryCategories: LibraryCategory[];
  currentOrgDetails: CurrentOrgDetails;
  dailySummaryReportStatus: DailySummaryReportStatu[];
  exerciseStatus: ExerciseStatu[];
  currentGroupDetails: CurrentGroupDetail[];
  correspondenceStatus: CorrespondenceStatu[];
  kpi: Kpi[];
  sla: Sla[];
  taskStatus: TaskStatu[];
  priorities: Priority[];
  taskType: TaskType[];
  incidentCategories: IncidentCategory2[];
  currentUserDetails: CurrentUserDetails;
  dailySumariesReportOptType: DailySumariesReportOptType[];
  exerciseCommitteeRole: ExerciseCommitteeRole[];
  exerciseMemberRole: ExerciseMemberRole[];
  assetsGroup: AssetsGroup[];
  assetsCategory: AssetsCategory[];
  orgQuickLink: any[];
  operationalReportStatus: OperationalReportStatu[];
  confidentialties: Confidentialty[];
  exerciseType: ExerciseType[];
  dashboardCard: any[];
  newsTypes: NewsType[];
  libraryAccessTypes: LibraryAccessType[];
  reasons: Reason[];
}

