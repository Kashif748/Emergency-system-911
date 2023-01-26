import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';

import { CommonService } from '@core/services/common.service';
import { forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { MenuItem } from 'src/app/pages/_layout/components/header/header-menu/menu-item.model';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { OrganizationsService } from '../../organizations.service';

@Component({
  selector: 'app-org-modules',
  templateUrl: './org-modules.component.html',
  styleUrls: ['./org-modules.component.scss'],
})
export class OrgModulesComponent implements OnInit, OnDestroy {
  @Input('orgData') orgData: any;
  @Output('close') close = new EventEmitter();
  type: string = 'notset';
  isLoading = true;
  showMsg = false;
  firstInit = true;
  modules$: MenuItem[];
  modulesList: MenuItem[];
  modulesSelection: any[] = [];
  modulesSelectionLength = 0;
  isChildOrg: boolean;
  @Input()
  isAddMode = false;
  selectAllModules = false;
  searching = false;
  lang = 'en';
  constructor(
    private translationService: TranslationService,
    private _organizations: OrganizationsService,
    private commonService: CommonService,
    private alertService: AlertsService,
    public directionalty: Directionality
  ) {}
  private commonData: any;
  ngOnInit(): void {
    this.commonData = this.commonService.getCommonData();
    if (this.type == 'notset') {
      this.orgData.type == 'add' ? (this.type = 'add') : (this.type = 'edit');
    }
    this.lang = this.translationService.getSelectedLanguage();
    const parentModulesRequest = this._organizations.getNavigationsMenu(this.orgData.parentId);
    const nodeModulesRequest = this._organizations.getNavigationsMenu(this.orgData.nodeId);
    this.isChildOrg = this.orgData.nodeId !== this.commonData?.currentOrgDetails?.id;
    this.isLoading = true;
    forkJoin({parentModules: parentModulesRequest, nodeModules: nodeModulesRequest})
    .pipe(finalize(() => this.isLoading = false))
    .subscribe((data) => {
      this.modules$ = data.parentModules;
      const flatedModules = [];
      
      this.flatModules(data.nodeModules, flatedModules);
      this.modules$ = this.patchValue(this.modules$, flatedModules, false);
      this.modulesList = this.modules$;
    })

  }

  private flatModule(
    m: { children: any[]; module: any; privileges: any },
    acc: any[]
  ) {
    acc.push(m);
    if (m.children?.length > 0) {
      m.children.forEach((sm) => {
        this.flatModule(sm, acc);
      });
    }
  }

  private flatModules(
    ms: { children: any[]; module: any; privileges: any }[],
    acc: any[]
  ) {
    ms.forEach((m) => {
      this.flatModule(m, acc);
    });
  }

  patchValue(parentModules: any[], currentOrgModules: any[], isParentSelected: boolean) {   
     parentModules.forEach((element) => {
      const module = currentOrgModules.find(
        (m) => m.module.id == element.module.id
      );
      
      if(!!module){
        element.selected = true;
        element.isEnabled = module.isEnabled;
        element.modified = this.isChildOrg;
      } else {
        element.selected = false;
        element.isEnabled = false;
      }
      
      if(Object.getOwnPropertyNames(element).includes('children')){
        this.patchValue(element.children, currentOrgModules, element.selected);
      }
    });
    if(!this.isChildOrg){
      parentModules = parentModules.filter((element) => element.selected);
    }
    return parentModules;
  }

  sendModules() {
    this.modulesSelection = [];
    this.getAllSelected(this.modules$);
    if (this.modulesSelection.length == 0) {
      this.showMsg = true;
      return;
    }

    this.modulesSelection.forEach(module => {
      delete module['id'];
    })
    
    this._organizations.updateModules(this.modulesSelection).subscribe(
      (data: any[]) => {
        this.alertService.openSuccessSnackBar();
        this.close.emit(true);
      },
      (err) => {
        this.alertService.openFailureSnackBar();
      }
    );
  }

  getAllSelected(list: MenuItem[]) {
    list.forEach((element) => {
      if(Object.getOwnPropertyNames(element).includes('children')){
        this.getAllSelected(element.children);
      }
      
      if (!this.isChildOrg) {

        let requestBody = {
          allowToFollow: false,
          enabled: element.isEnabled,
          id: 0,
          module: { id: element.module.id },
          orgStructure: {
            id: this.orgData.nodeId,
          },
        };
        this.modulesSelection.push(requestBody);
      } else if (element.selected || element?.children?.some(module => module.selected)) {
        let requestBody = {
          allowToFollow: false,
          enabled: element.isEnabled,
          id: 0,
          module: { id: element.module.id },
          orgStructure: {
            id: this.orgData.nodeId,
          },
        };
        this.modulesSelection.push(requestBody);
      }
    });
    
  }

  applyFilter(event: Event) {
    this.searching = true;
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.length == 0 || filterValue == ' ') {
      this.modulesList = this.modules$;
      this.searching = false;
    } else {
      this.modulesList = this.modules$.filter((item) => {
        if (
          item.module.nameEn.toLowerCase().indexOf(filterValue) > -1 ||
          item.module.nameAr.toLowerCase().indexOf(filterValue) > -1
        )
          return item;
      });
      this.searching = false;
    }
  }

  selectAll(list, select) {
    if(list){
      list.forEach((t) => {
        t.selected = select;
        if(!select){
          t.isEnabled = false;
        }
        this.selectAll(t.children, select);
      });
    }
    
  }

  updateAllSelect(idParam) {
    const item = this.modules$.find((module) => module.id === idParam);
    if (item.children == null) {
      return false;
    }
    item.selected =
      item.selected != null && item.children.every((t) => t.selected);
  }

  someSelected(idParam): boolean {
    const item = this.modules$.find((module) => module?.module.id === idParam);
    if (item == null) {
      item.indeterminate = false;
      return false;
    }

    if(!item.selected){
      item.indeterminate = item.children.some((t) => t.selected);
      return item.indeterminate;
    }
  }

  allSelected(moduleId: number): boolean {
    const item = this.modules$.find((module) => module?.module.id === moduleId);
    if (item == null) {
      return false;
    }
    item.selected = item.children.every(module => module.selected);
    return item.selected
  }

  setAllForItem(selected: boolean, idParam) {
    const item = this.modules$.find((module) => module?.module.id === idParam);
    
    item.selected = selected;
    if(!selected){ item.isEnabled = false };

    if (item.children == null) {
      return;
    }

    item.children.forEach((t) => {
      if(!selected){ t.isEnabled = false };
      t.selected = selected;
    });
  }

  onEnableChange(change:MatSlideToggleChange, item: any){
    if(this.isChildOrg) {
      if(item.children?.length){
        item.isEnabled = change?.checked;
        item.children.forEach(v => { 
          v.isEnabled = change?.checked;
          v.selected = change?.checked;
        });
      } else {
        item.isEnabled = change?.checked;
        item.selected =  item.isEnabled;
      }
    } else {
      if(item.children?.length){
        item.isEnabled = change?.checked;
        item.children.forEach(v => { 
          v.isEnabled = change?.checked;
        });
      } else {
        item.isEnabled = change?.checked;
      }
    }
    
  }

  //
  ngOnDestroy(): void {
    this.selectAll(this.modules$, false);
  }
}
