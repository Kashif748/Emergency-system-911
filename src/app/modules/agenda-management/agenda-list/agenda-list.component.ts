import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { TranslationService } from "../../i18n/translation.service";

@Component({
  selector: "app-agenda-list",
  templateUrl: "./agenda-list.component.html",
  styleUrls: ["./agenda-list.component.scss"],
})
export class AgendaListComponent implements OnInit {
  lang = "en";
  displayedColumns: string[] = [
    "nameAr",
    "nameEn",
    "shiftsNumber",
    "isActive",
    "actions",
  ];
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);

  loading: boolean = true;

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();

    for (let index = 0; index < 40; index++) {
      this.dataSource.data.push({
        nameAr: "الاسم ",
        nameEn: "الاسم ",
        shiftsNumber: "4 ",
        isActive: false,
      });
    }
  }

  onPagination(event: { pageSize: number; pageIndex: number }) {}

  newAgenda() {}

  editAgenda(element) {}
  deleteAgenda(id) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.filter.name = filterValue;
    // this.onPagination({ pageIndex: 0, pageSize: 10, length: 10 });
  }
}
