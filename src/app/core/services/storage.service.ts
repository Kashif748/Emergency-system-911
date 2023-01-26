import {Injectable} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {map, distinctUntilChanged} from 'rxjs/operators';

export interface StorageState {
  [key: string]: any;
}

@Injectable()
export abstract class IStorageService {
  abstract setState(key: string, value: any): void;

  abstract getState<T = any>(key: string): Observable<T>;

  abstract getItem<T = any>(key: string): T;

  abstract setItem(key: string, value: any): void;

  abstract removeItem(key: string);

  abstract clear(): void;
}

@Injectable()
export class StorageService implements IStorageService {
  // Variables
  private state: StorageState = {};
  private store = new BehaviorSubject<StorageState>(this.state);
  private state$ = this.store.asObservable();


  constructor() {
    this.loadStorageData();
  }

  private loadStorageData() {
    for (let index = 0; index < localStorage?.length; index++) {
      const key = localStorage.key(index);
      try {
        this.state[key] = JSON.parse(localStorage[key]);
      } catch {
        this.state[key] = localStorage[key];
      }
    }
  }


  public setState(key: string, value: any): void {
    if (this.state.hasOwnProperty(key)) {
      this.state[key] = value;
    } else {
      Object.defineProperty(this.state, key, {value, writable: true});
    }

    this.store.next(this.state);
    this.setItem(key, value);
  }

  public getState<T = any>(key: string): Observable<T> {
    return this.state$.pipe(
      map((state) => {
        // just to ensure immutability
        return state[key] instanceof Object
          ? {...state[key]}
          : state[key] instanceof Array
            ? (([...state[key]] as unknown) as T)
            : state[key];
      }),
      distinctUntilChanged()
    );
  }


  public getItem<T = any>(key: string): T {
    try {
      return JSON.parse(localStorage[key]);
    } catch {
      return localStorage[key];
    }
  }

  public setItem(key: string, value: any): void {
    try {
      localStorage[key] = JSON.stringify(value);
    } catch {
      localStorage[key] = value;
    }
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
