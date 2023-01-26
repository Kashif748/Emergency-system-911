import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IncidentsService } from 'src/app/_metronic/core/services/incidents.service';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.scss']
})
export class FormReportComponent implements OnInit {
  incidents$: Observable<any>
  confidentialty: any[] = [
    {
      id: 1,
      nameAr: 'Restricted',
      nameEn: 'Restricted',
    },
    {
      id: 2,
      nameAr: 'Secret',
      nameEn: 'Secret',
    },
    {
      id: 3,
      nameAr: 'Top Secret',
      nameEn: 'Top Secret',
    },

  ];
  lang = 'en'
  form: FormGroup;
  constructor(private incidentsService: IncidentsService, private fb: FormBuilder,private translationService: TranslationService,) { }

  ngOnInit(): void {
    this.createForm()
    this.lang = this.translationService.getSelectedLanguage();

    this.incidents$ = this.incidentsService.getIncidents(0)
  }


  createForm() {

    this.form = this.fb.group({
      update: ['', Validators.required],
      incidentId: [0, Validators.required],
      confidentialtyID: ['', Validators.required],
    })

  }


  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  onSubmit() {
    //console.log(this.form.value)
  }

}
