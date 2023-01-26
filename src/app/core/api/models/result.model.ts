export interface GResult<T = any> {
  error: any;
  status: boolean;
  result: T;
}
