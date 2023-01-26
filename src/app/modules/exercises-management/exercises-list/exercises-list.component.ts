import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { TranslationService } from "../../i18n/translation.service";

@Component({
  selector: "app-exercises-list",
  templateUrl: "./exercises-list.component.html",
  styleUrls: ["./exercises-list.component.scss"],
})
export class ExercisesListComponent implements OnInit {
  displayedColumns: string[] = [
    "code",
    "name",
    "date",
    "type",
    "stage",
    "actions",
  ];
  loading: boolean = false;
  dataSource = new MatTableDataSource<any>();

  searchForm: FormGroup;
  maxDate: Date;
  minDate: Date;
  lang = "en";
  constructor(
    private translationService: TranslationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.createForm();
  }

  createForm() {
    this.searchForm = this.fb.group({
      type: [""],
      name: [""],
      date: [""],
      code: [""],
    });

    this.dataSource.data = [
      {
        type: "داخلي",
        name: "مهارات القيادة",
        date: "1/5/2021",
        code: "EXCER_1",
        stage: "المرحلة الاولى",
      },
    ];
  }

  onSubmit() {}

  resetSearchForm() {}

  viewItem(item) {}
}
