import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IStorageService } from '@core/services/storage.service';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

@Component({
  selector: 'app-kpi-priorities-modal',
  templateUrl: './kpi-priorities-modal.component.html',
  styleUrls: ['./kpi-priorities-modal.component.scss'],
})
export class KpiPrioritiesModalComponent implements OnInit {
  lang = 'en';
  commonData: any;
  priorities: any[] = [];
  kpiPriorities: any[] = [];
  kpiElement;
  constructor(
    private translationService: TranslationService,
    private storageService: IStorageService,
    public dialogRef: MatDialogRef<KpiPrioritiesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.commonData = this.storageService.getItem('commonData');
    this.priorities = this.commonData?.priorities;
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.kpiElement = this.data.kpi;
    if (this.kpiElement && this.kpiElement.kpiPriorities) {
      this.setCategory();
      console.log(this.kpiElement);

      this.kpiElement.kpiPriorities.forEach((item) => {
        let priority = this.priorities.find((el) => el.id == item.priority.id);
        this.kpiPriorities.push({ ...priority, period: item.period });
      });
      console.log(this.kpiPriorities);
    }
  }

  setCategory() {
    let catId = this.kpiElement?.incidentCategory?.id;
    let categories: any[] = this.commonData['incidentCategories'];
    if (categories.length <= 0 || !catId) return;
    const subCategory = categories.find((item) => item.id == catId);
    if (subCategory) {
      this.kpiElement.incidentCategory = subCategory;
      const category = categories.find(
        (item) => subCategory?.parent?.id == item.id
      );
      if (category) this.kpiElement.ParentIncidentCategory = category;
    }
  }
}
