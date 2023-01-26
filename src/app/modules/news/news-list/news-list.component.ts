import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from 'src/app/core/services/dialog.service';

import { NewsService } from '../news.service';
import { Inew } from '../models/new.interface';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
})
export class NewsListComponent implements OnInit, OnDestroy {
  dialogRef: any;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  displayedColumns: string[] = [
    'title',
    'body',
    'expiredate',
    'isActive',
    'actions',
  ];

  dataSource: MatTableDataSource<any>;
  destroy$: Subject<boolean> = new Subject();

  constructor(
    private router: Router,
    private _news: NewsService,
    public _matDialog: MatDialog,
    private _translate: TranslationService,
    private activatedRoute: ActivatedRoute,
    private dialogService: DialogService
  ) {}

  paginationConfig = {
    itemsPerPage: 10,
    currentPage: 0,
    totalItems: 0,
    id: 'paging',
  };

  pageChanged(event) {
    console.log(event);
    this.paginationConfig.currentPage = event;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  loading = false;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);

    this._news.newsChanged$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      console.log(data);
      this.dataSource.data = [...data];
    });
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  edit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  delete(element: Inew) {
    this.dialogService.deleteConfirm().subscribe(async (confirm) => {
      if (confirm) {
        await this._news.update(element?.id, { ...element, isActive: false });
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
    this.destroy$.unsubscribe();
  }
}
