import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataSourceService } from 'src/app/modules/services/data-source/data-source.service';
const baseUrl = 'phonebook';
@Injectable()
export class EmergenciesPhonebookService extends DataSourceService {
  phonebook: any;
  phonebookChange$: BehaviorSubject<any[] | null> = new BehaviorSubject(null);

  constructor() {
    super(baseUrl);
  }

  getPhonebook(size?, page?, sort?: any) {
    return this.getAll<any>('', {
      size: size ?? '10',
      page: page ?? '0',
      sort: `${sort?.active ?? ''},${sort?.direction ?? ''}`,
    });
  }
}
