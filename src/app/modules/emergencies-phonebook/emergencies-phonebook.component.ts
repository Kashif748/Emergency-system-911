import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ILangFacade } from '@core/facades/lang.facade';
import { TranslationService } from '../i18n/translation.service';
import { EmergenciesPhonebookService } from './emergencies-phonebook.service';

@Component({
  selector: 'app-emergencies-phonebook',
  templateUrl: './emergencies-phonebook.component.html',
  styleUrls: ['./emergencies-phonebook.component.scss'],
})
export class EmergenciesPhonebookComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'firstName',
    'middleName',
    'lastName',
    'jobTitle',
    'phoneNumber',
    'mobileNumber',
    'orgName',
    'isActive',
    'actions',
  ];
  loading: boolean = false;
  dataSource = new MatTableDataSource<any>();

  searchForm: FormGroup;
  maxDate: Date;
  minDate: Date;
  lang = 'en';
  constructor(
    private translationService: TranslationService,
    private service: EmergenciesPhonebookService,
    private fb: FormBuilder,
    private langFacade: ILangFacade
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.service.getPhonebook().subscribe((res) => {
      console.log(res);
    });
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      type: [''],
      name: [''],
      date: [''],
      code: [''],
    });

    this.dataSource.data = [
      {
        type: 'داخلي',
        name: 'مهارات القيادة',
        date: '1/5/2021',
        code: 'EXCER_1',
        stage: 'المرحلة الاولى',
      },
    ];
  }
  onSubmit() {}

  resetSearchForm() {}
}
