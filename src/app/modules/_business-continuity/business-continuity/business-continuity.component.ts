import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { TABS } from '../tabs.const';

@Component({
  selector: 'app-business-continuity',
  templateUrl: './business-continuity.component.html',
  styleUrls: ['./business-continuity.component.scss'],
})
export class BusinessContinuityComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  items: MenuItem[] = [];
  visible = false;
  sidebar = false;

  form: FormGroup;
  public position$ = this.langFacade.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'right' : 'left'))
  );
  public smallScreen: boolean;
  private destroy$ = new Subject();

  constructor(
    private langFacade: ILangFacade,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private cdr :ChangeDetectorRef
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngOnInit() {
    this.createForm();
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small ])
      .pipe(
        takeUntil(this.destroy$),
        map((c) => c.matches),
        tap((c) => {
        this.smallScreen = c;
          c ? (this.sidebar = false) : (this.sidebar = true);
        })
      )
      .subscribe();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items = this.translateMenu(TABS);
      this.visible = true;
      this.cdr.detectChanges();
    }, 1000);
  }
  translateMenu(items: MenuItem[]): MenuItem[] {
    return items.map((tab) => {
      tab.label = this.translate.instant(tab.label);
      if (tab.items && tab.items.length > 0) {
        tab.items = this.translateMenu(tab.items);
      }
      return tab;
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      version: [null, [Validators.required]],
      desc: [null, [Validators.required]],
    });
  }
}
