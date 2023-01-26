import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { TranslationModule } from '../i18n/translation.module';
import { MaterialModule } from '../../shared/material.module';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';

import { CreateFileComponent } from './create-file/create-file.component';
import { CreateFolderComponent } from './create-folder/create-folder.component';
import { LibListComponent } from './lib-list/lib-list.component';


@NgModule({
  declarations: [LibraryComponent, LibListComponent, CreateFolderComponent, CreateFileComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MaterialModule,
    TranslationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [AlertsService]
})
export class LibraryModule { }
