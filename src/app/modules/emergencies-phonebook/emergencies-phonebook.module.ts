import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergenciesPhonebookComponent } from './emergencies-phonebook.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: EmergenciesPhonebookComponent,
  },
];

@NgModule({
  declarations: [EmergenciesPhonebookComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class EmergenciesPhonebookModule {}
