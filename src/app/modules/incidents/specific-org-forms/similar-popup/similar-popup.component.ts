import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IncidentsService } from '@core/api/services/incident.service';

@Component({
  selector: 'app-similar-popup',
  templateUrl: './similar-popup.component.html',
  styleUrls: ['./similar-popup.component.scss'],
})
export class SimilarPopupComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['serial', 'subject', 'link'];

  dataSource = new MatTableDataSource<any>([]);

  constructor(
    protected incidentService: IncidentsService,
    public dialogRef: MatDialogRef<SimilarPopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: MatTableDataSource<any[]>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.dataSource = this.data;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
