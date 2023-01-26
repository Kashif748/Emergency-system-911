import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineSVGModule } from 'ng-inline-svg';

import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { TranslationModule } from './../i18n/translation.module';
import { MaterialModule } from '../../shared/material.module';

import { DailyBrevityRoutingModule } from './daily-brevity-routing.module';
import { DailyBrevityComponent } from './daily-brevity.component';

import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [DailyBrevityComponent, FormComponent, ListComponent],
  imports: [
    CommonModule,
    DailyBrevityRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    AngularFileUploaderModule,
    SharedModule
  ],
  providers: [AlertsService],
})
export class DailyBrevityModule { }
