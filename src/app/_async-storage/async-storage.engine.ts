import { Observable, of } from 'rxjs';
import { AsyncStorageEngine } from './symbols';

/**
 * @Description Proxy used around synchronous storage engines to provide the same internal API than async engines
 */
export class AsyncStorageEngineProxy implements AsyncStorageEngine {
  constructor() {}

  public get length(): number {
    return localStorage.length;
  }

  public getItem(key): Observable<any> {
    return of(localStorage.getItem(key));
  }

  public setItem(key, val): void {
    localStorage.setItem(key, val);
  }

  public removeItem(key): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
