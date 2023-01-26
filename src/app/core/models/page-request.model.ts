export interface PageRequestModel {
  filters?: { [key: string]: any };
  first: number;
  rows: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
}
