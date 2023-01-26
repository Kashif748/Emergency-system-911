import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnInit {



  displayedColumns:string[];
  
  @Input('data') dataSource:any;

  @Output('add') add$:EventEmitter<any> = new EventEmitter();
  @Output('edit') edit$:EventEmitter<any> = new EventEmitter();
  @Output('delete') delete$:EventEmitter<any> = new EventEmitter();
  



  constructor() { }

  ngOnInit(): void {

    this.displayedColumns = ['title','body','expireDate','body','isActive','actions'];
    
  }


  onPagination(pagination) {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

}
