import {
  Component,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { OrganizationsService } from 'src/app/modules/organization/organizations.service';
import { Organization } from 'src/app/modules/organization/models/organization.model';
import { animations } from 'src/app/shared/animations/animation';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { MatDialog } from '@angular/material/dialog';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { from, Subject } from 'rxjs';
import {
  first,
  skipWhile,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { IStorageService } from '@core/services/storage.service';

class NodeOrganization extends Organization {
  selected: boolean;
  indeterminate: boolean; // is some  childrens  selected
  children: NodeOrganization[];
  constructor(org) {
    super(org);
    this.selected = false;
    this.indeterminate = false;

    // mapping children recursively  to  the extended  stracture
    this.children = !!org.children
      ? org.children.map((item) => new NodeOrganization(item))
      : [];
  }
}
@Component({
  selector: 'app-pick-org',
  templateUrl: './pick-org.component.html',
  styleUrls: ['./pick-org.component.scss'],
  animations: [animations],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PickOrgComponent),
      multi: true,
    },
  ],
})
export class PickOrgComponent
  implements OnInit, ControlValueAccessor, OnDestroy
{
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  @Output() selectionChange = new EventEmitter();
  @Input() multipleSelection = true;
  @Input() leafNodes = true;
  @Input() returnFullObj = false;
  @Input() isIconBtn = false;
  @Input() childrenOfCurrentOrg = false;
  @Input() showRemoveIcon = true;
  @Input() label: string = 'GROUP.org';
  @Input() appearance: string = 'fill';
  @Output() selectOrgName = new EventEmitter();

  treeControl = new NestedTreeControl<NodeOrganization>(
    (node) => node.children
  );
  dataSource = new MatTreeNestedDataSource<NodeOrganization>();
  orginalData: Organization[] = [];
  searching = false;
  public orgsLoading = false;
  lang = 'en';

  selectedItems: NodeOrganization[] = [];
  seletedIds = [];
  selectOrgList = [];
  orgsCtrl = new FormControl([]);

  dialogRef;

  destroy$: Subject<boolean> = new Subject();

  direction: Direction;

  constructor(
    private organiztions: OrganizationsService,
    private translationService: TranslationService,
    public matDialog: MatDialog,
    private storageService: IStorageService,
    private dir: Directionality
  ) {}

  hasChild = (_: number, node: NodeOrganization) =>
    !!node.children && node.children.length > 0;
  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.orgsLoading = true;

    const commonData = this.storageService.getItem('commonData');
    const currentOrgId = this.childrenOfCurrentOrg
      ? commonData?.currentOrgDetails?.id
      : null;
    const observable = from(this.organiztions.getOrgs(currentOrgId));

    observable
      .pipe(
        switchMap((res) => this.organiztions.treeRootChanged$),
        skipWhile((data) => data?.length == 0),
        take(1)
      )
      .subscribe(
        (data) => {
          if (data) {
            this.orginalData = data;
            // set the  tree root
            this.dataSource.data = data.map(
              (node) => new NodeOrganization(node)
            );
            if (!!data) {
              this.treeControl.expand(this.dataSource.data[0]);
              this.orgsLoading = false;
              // call  this functions  to  get current selectd items
              this.mapCurrentSelected(this.dataSource.data);
            }
          }
        },
        (err) => (this.orgsLoading = false)
      );
    this.orgsCtrl.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((v) => {
      this.onChange(v);
    });
  }
  openOrgModal() {
    this.dialogRef = this.matDialog.open(this.dialogTemplate, {
      disableClose: false,
      panelClass: 'pick-orgs-modal',
    });
    this.dialogRef
      .afterClosed()
      .pipe(
        tap((data) => {
          // if user  don't  click   save btn  we will  dicrade  changes
          if (!data) {
            // this.mapCurrentSelected(this.dataSource.data);
          }
        })
      )
      .subscribe();
  }

  selectChangeForItem(state: boolean, node: NodeOrganization) {
    node.selected = state;
    if (state) {
      this.selectedItems.push(node);
    } else {
      const index = this.selectedItems.indexOf(node);
      if (index >= 0) {
        this.selectedItems.splice(index, 1);
      }
    }
    // change  selection  for  childrens  node  when    multiple  selection  active
    if (this.multipleSelection) {
      node.children.forEach((item) => this.selectChangeForItem(state, item));
    }
  }

  allSelected(node: NodeOrganization) {
    if (node.children.length > 0) {
      return (node.selected = node.children.every(
        (item) => item.selected === true
      ));
    } else {
      return node.selected;
    }
  }

  // to  decide  if  node  is  indeterminate
  someSelected(node: NodeOrganization): boolean {
    node.indeterminate =
      node.children.some(
        (item) => item.selected === true || item.indeterminate === true
      ) && !node.children.every((item) => item.selected === true);

    return node.indeterminate;
  }

  // TODO - apply  value  changes  on  save button click
  saveAndClose() {
    let result;
    this.seletedIds = this.selectedItems.map((item) => item.id);
    this.selectOrgList = this.selectedItems.map((item) => item.code);
    if (this.returnFullObj) {
      result = this.selectedItems;
    } else {
      result = this.seletedIds;
    }

    if (this.multipleSelection) {
      this.orgsCtrl.setValue(result);
    } else {
      this.orgsCtrl.setValue(result[0]);
    }
    this.selectOrgName.emit(this.selectOrgList);
    this.dialogRef.close(true);
  }

  getSelectedNodes(node: NodeOrganization) {
    let selected = [];
    if (node.selected) {
      return node;
    }
    if (node.indeterminate) {
      node.children.map((item) => {
        return this.getSelectedNodes(item);
      });
    }
  }
  // only  when  is single  select
  setSingleSelect(node: NodeOrganization) {
    this.selectedItems.forEach((item) => (item.selected = false)); // remove  selected  item
    node.selected = true;
    this.selectedItems = [node];
  }

  // TODO  filter  logic

  // filter string from mat input filter
  applyFilter(event: Event) {
    const filterText = event.target['value'];
    this.searching = true;
    this.filterTree(filterText);
  }

  // pass mat input string to recursive function and return data
  filterTree(filterText: string) {
    // use filter input text, return filtered TREE_DATA, use the 'name' object value
    const filterBy = this.lang == 'en' ? 'nameEn' : 'nameAr';
    this.dataSource.data = this.filterRecursive(
      filterText,
      this.orginalData,
      filterBy
    );
  }
  // filter recursively on a text string using property object value
  filterRecursive(filterText: string, array: Organization[], property: string) {
    let filteredData;

    //make a copy of the data so we don't mutate the original
    function copy(o: any) {
      return Object.assign({}, o);
    }

    // has string
    if (filterText) {
      // need the string to match the property value
      filterText = filterText.toLowerCase();
      // copy obj so we don't mutate it and filter
      filteredData = array.map(copy).filter(function x(y) {
        if (y[property].toLowerCase().includes(filterText)) {
          return true;
        }
        // if children match
        if (y.children) {
          return (y.children = y.children.map(copy).filter(x)).length;
        }
      });
      // no string, return whole array
    } else {
      filteredData = array;
    }

    return filteredData;
  }

  remove(node: NodeOrganization): void {
    this.selectedItems = this.selectedItems.filter(
      (item) => item.id !== node.id
    ); // remove  selected  item
    node.selected = false;
    this.orgsCtrl.setValue(this.selectedItems);
  }
  // controller  value  implementaion
  // Functions

  mapCurrentSelected(nodes: NodeOrganization[]) {
    if (this.seletedIds?.length > 0) {
      for (let i = 0; i < nodes.length; i++) {
        let element = nodes[i];
        const index = this.selectedItems.indexOf(element);
        if (this.seletedIds.includes(element.id) && index == -1) {
          element.selected = true;
          this.selectedItems = [...this.selectedItems, element];
        } else {
          if (index >= 0) {
            this.selectedItems.splice(index, 1);
            element.selected = false;
          }
        }
        this.mapCurrentSelected(element.children);
      }
    }
  }

  setIdsList(obj) {
    if (obj instanceof Array && obj?.length > 0) {
      this.seletedIds = obj.map((element) => {
        return element?.id || element;
      });
    } else if (obj) {
      if (this.multipleSelection) {
        this.seletedIds.push(obj.id || obj);
      } else {
        this.seletedIds = [obj.id || obj];
      }
    }
  }

  onChange: any = () => {};

  writeValue(obj: any): void {
    this.setIdsList(obj);
    this.mapCurrentSelected(this.dataSource.data);
    if (this.multipleSelection) {
      this.orgsCtrl.setValue(this.selectedItems);
    } else {
      this.orgsCtrl.setValue(this.selectedItems[0] || []);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
