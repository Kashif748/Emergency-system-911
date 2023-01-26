export interface SuggestionStatus {
  id?: number;
  nameAR?: string;
  nameEN?: string;
}

export interface OrgStructure {
  id?: number;
  label?: string;
}

export interface Org {
  id?: number;
  nameAr?: string;
  nameEn?: string;
}
export interface User {
  id?: number;
  orgStructure?: OrgStructure;
  userName?: string;
}
export interface Suggestion {
  id?: number;
  description?: string;
  createdOn?: string;
  statusId?: number;
  stype?: string;
  suggestionStatus?: SuggestionStatus;
  user: User;
  /** user id */
  createdBy?: number;
  title?: string;
  org?: Org;
}
