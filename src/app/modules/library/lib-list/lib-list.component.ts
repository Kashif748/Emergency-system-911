import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DialogService } from 'src/app/core/services/dialog.service';
import { UrlHelperService } from 'src/app/core/services/url-helper.service';
import { LibrariesService } from 'src/app/_metronic/core/services/library.service';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { CreateFileComponent } from '../create-file/create-file.component';
import { CreateFolderComponent } from '../create-folder/create-folder.component';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-lib-list',
  templateUrl: './lib-list.component.html',
  styleUrls: ['./lib-list.component.scss'],
})
export class LibListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  library$: Observable<any>;
  library = [];
  breadcrumb = [{ name: 'المكتبة', id: null }];
  lang: any;
  isEdit: boolean = false;
  isLoading = false;

  paginationConfig = {
    pageSize: 15,
    pageIndex: 0,
    length: 0,
  };
  private subscriptions: Subscription[] = [];

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  isSmall$ = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall])
    .pipe(map((state) => state.matches));

  constructor(
    private libService: LibrariesService,
    public dialog: MatDialog,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    private urlHelper: UrlHelperService,
    private dialogService: DialogService,
    private alertService: AlertsService,
    private breakpointObserver: BreakpointObserver
  ) {}

  private accessTypes: any[];

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.isLoading = true;

    let sub = this.libService
      .getAccessTypes()
      .pipe(
        switchMap((accessTypes: any[]) =>
          this.libService.getLibrarys(this.paginationConfig).pipe(
            map((libs: any[]) => {
              libs.forEach((l) => {
                l.libraryAccessType = accessTypes.find(
                  (a) => a?.id == l?.libraryAccessType?.id
                );
              });
              this.accessTypes = accessTypes;

              return libs;
            })
          )
        )
      )
      .subscribe(
        (lib) => {
          this.library = lib;

          this.isLoading = false;

          this.dataSource.data = lib;
          // this.dataSource.paginator = this.paginator;
          this.obs = this.dataSource.connect();
          this.cdr.detectChanges();
        },
        (error) => {
          this.isLoading = false;
          this.cdr.detectChanges();
          this.alertService.openFailureSnackBarWithMsg(
            this.lang == 'ar'
              ? error?.error?.error?.message_Ar
              : error?.error?.error?.message_En
          );
        }
      );

    this.libService.onPaginationConfigChange.subscribe((data) => {
      if (data) {
        this.paginationConfig = data;
      }
    });

    this.subscriptions = [...this.subscriptions, sub];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async downloadFile(id) {
    const files = await this.libService
      .getAttachments(id)
      .pipe(map((r) => r.result))
      .toPromise();

    if (files?.length > 0) {
      const file = files[files?.length - 1];
      this.urlHelper.download(file);
    } else {
      this.alertService.openFailureSnackBarWithMsg(
        this.translationService.get('ERROR_MSG.FILE_HAS_NO_CONTENT')
      );
    }
  }

  deleteLibrary(id) {
    let sub = this.dialogService.deleteConfirm().subscribe(
      (res) => {
        if (res) {
          this.dataSource.data = this.dataSource.data.filter(
            (it) => it.id !== id
          );

          this.libService.deleteFolder(id);
          this.cdr.detectChanges();
        }
      },
      (err) => {
        this.alertService.openFailureSnackBar();
      }
    );
    this.subscriptions = [...this.subscriptions, sub];
  }

  public isRoot = true;

  getAttachments(lib, isBrea) {
    if (lib?.itemType?.value == 'File') {
      return;
    }
    if (isBrea && lib?.id === null) {
      this.isLoading = true;
      let sub = this.libService
        .getLibrarys(this.paginationConfig)
        .pipe(
          map((libs: any[]) => {
            libs.forEach((l) => {
              l.libraryAccessType = this.accessTypes.find(
                (a) => a?.id == l?.libraryAccessType?.id
              );
            });
            return libs;
          })
        )
        .subscribe(
          (library) => {
            this.library = library;
            this.isLoading = false;

            this.dataSource.data = library;
            this.cdr.detectChanges();
            this.isRoot = true;
            this.updateNav(lib, isBrea);
          },
          (error) => {
            this.isLoading = false;
            this.cdr.detectChanges();
            this.alertService.openFailureSnackBarWithMsg(
              this.lang == 'ar'
                ? error?.error?.error?.message_Ar
                : error?.error?.error?.message_En
            );
          }
        );
      this.subscriptions = [...this.subscriptions, sub];
    } else {
      this.isLoading = true;

      let sub = this.libService
        .getChildsLibrarys(lib.id, this.paginationConfig)
        .pipe(
          map((libs: any[]) => {
            libs.forEach((l) => {
              l.libraryAccessType = this.accessTypes.find(
                (a) => a?.id == l?.libraryAccessType?.id
              );
            });
            return libs;
          })
        )
        .subscribe(
          (x) => {
            this.library = x;
            this.isLoading = false;

            this.dataSource.data = x;
            // this.dataSource.paginator = this.paginator;
            this.obs = this.dataSource.connect();
            this.cdr.detectChanges();
            this.isRoot = false;
            this.updateNav(lib, isBrea);
          },
          (error) => {
            this.isLoading = false;
            this.cdr.detectChanges();
            this.alertService.openFailureSnackBarWithMsg(
              this.lang == 'ar'
                ? error?.error?.error?.message_Ar
                : error?.error?.error?.message_En
            );
          }
        );
      this.subscriptions = [...this.subscriptions, sub];
    }
  }

  onPagination(e) {
    this.paginationConfig = e;
    let lastItem = this.breadcrumb[this.breadcrumb.length - 1];
    this.getAttachments(lastItem, this.isRoot);
  }
  private updateNav(lib, isBrea) {
    let index = this.breadcrumb.indexOf(lib);
    if (isBrea)
      this.breadcrumb.splice(index + 1, this.breadcrumb.length - (index + 1));
    if (!isBrea && index < 0)
      this.breadcrumb.push({ name: lib.name, id: lib.id });
  }

  open(lib) {
    if (lib.itemType.value === 'Folder') {
      this.createFolder(lib, true);
    } else {
      this.createFile(lib, true);
    }
  }

  createFolder(lib = null, isEdit = false) {
    let parent = this.breadcrumb[this.breadcrumb.length - 1];
    const dialogRef = this.dialog.open(CreateFolderComponent, {
      width: '600px',

      data: { parent: parent, data: lib, isEdit },
    });

    let sub = dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();

      this.cdr.detectChanges();
      this.getAttachments(parent, parent?.id == null);
    });
    this.subscriptions = [...this.subscriptions, sub];
  }

  createFile(lib = null, isEdit = false) {
    let library = '';
    if (lib !== null) library = lib;
    let parent = this.breadcrumb[this.breadcrumb.length - 1];
    const dialogRef = this.dialog.open(CreateFileComponent, {
      width: '600px',
      backdropClass: '',
      disableClose: true,
      data: { parent: parent, data: lib, isEdit },
    });

    let sub = dialogRef.afterClosed().subscribe((result) => {
      if (!result?.id) return;
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      this.cdr.detectChanges();
      this.getAttachments(parent, !parent?.id);
    });
    this.subscriptions = [...this.subscriptions, sub];
  }
}
