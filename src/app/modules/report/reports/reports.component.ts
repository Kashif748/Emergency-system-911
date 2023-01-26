import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslationService } from '../../i18n/translation.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  displayedColumns: string[] = ['update', 'confidentialty', 'incidents'];
  confidentialty: any[] = [
    {
      id: 1,
      nameAr: 'Restricted',
      nameEn: 'Restricted',
    },
    {
      id: 2,
      nameAr: 'Secret',
      nameEn: 'Secret',
    },
    {
      id: 3,
      nameAr: 'Top Secret',
      nameEn: 'Top Secret',
    },

  ];
  dataSource = new MatTableDataSource<any>([{update:'test 1 ',confidentialty:'test 2 ',incidents:'incidents ss'}]);

  correspondencesList: any[] = []
  @ViewChild(MatPaginator) paginator: MatPaginator;

  lang = 'en'


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }
  constructor(private cdr: ChangeDetectorRef, private translationService: TranslationService,) { }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    // this.circularsService.getCirculars().subscribe(cir=>{
    //   this.correspondencesList = cir.content
    //   this.dataSource = new MatTableDataSource<any>(this.correspondencesList);
    //   //console.log(this.dataSource.data)
    //   this.dataSource.paginator = this.paginator;
    //   // this.dataSource.sort = this.sort;
    //   this.cdr.detectChanges()
    // })
  }


}
