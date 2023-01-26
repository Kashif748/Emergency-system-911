import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";

import { ReportsService } from "@core/api/services/reports.service";
import { IStorageService } from "@core/services/storage.service";

import { Subject } from "rxjs";
import { map, takeUntil, tap, throttleTime } from "rxjs/operators";

@Component({
  selector: "app-readiness",
  templateUrl: "./readiness.component.html",
  styleUrls: ["./readiness.component.scss"],
})
export class ReadinessComponent implements OnInit, OnDestroy {
  constructor(
    private reportsService: ReportsService,
    private formBuilder: FormBuilder,
    private storageService: IStorageService
  ) {}
  private destroy$ = new Subject();
  public initForm$ = this.storageService.getState("daily-report-init").pipe(
    map((r) => {
      return {
        ...r,
        sub_date: r?.date ? this.subtractDateDays(r?.date) : new Date(),
      };
    })
  );

  subtractDateDays(date, days = 1) {
    let dt = new Date(date);
    dt?.setDate(dt?.getDate() - days);
    return dt;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  calcSumCat(cat) {
    return (<any[]>cat.subCategories)
      .map((c) => c.count)
      .reduce((prv, cur) => prv + cur, 0);
  }

  public form: FormGroup;
  ngOnInit() {
    this.form = this.buildForm();

    let value = this.storageService.getItem("daily-report-readiness");
    this.form.patchValue(value ?? {});

    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.storageService.setState("daily-report-readiness", v);
    });
  }

  private buildForm() {
    let form = this.formBuilder.group({
      numbers: this.formBuilder.array([]),
    });

    return form;
  }

  initForm(length: number) {}
  public padding = [];
  public reportData$ = this.reportsService.getAdcdaReport().pipe(
    tap((cats) => {
      this.padding = new Array(3 - (cats.length % 3)).fill(null);
      let value = this.storageService.getItem("daily-report-readiness");
      for (let index = 0; index < cats.length; index++) {
        (<FormArray>this.form.get("numbers")).insert(
          index,
          this.formBuilder.group({
            prefix: [value?.numbers[index].prefix],
            number: [value?.numbers[index].number],
          })
        );
      }
    })
  );
}
