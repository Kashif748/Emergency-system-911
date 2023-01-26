import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { CommitteeMemberComponent } from "./committee-member/committee-member.component";

@Component({
  selector: "app-exercise-committe",
  templateUrl: "./exercise-committe.component.html",
  styleUrls: ["./exercise-committe.component.scss"],
})
export class ExerciseCommitteComponent implements OnInit {
  displayedColumns: string[] = [
    "name",
    "committeeRole",
    "memberRole",
    "actions",
  ];
  dataSource = new MatTableDataSource<any>();

  exerciseForm: FormGroup;
  lang = "en";

  DialogRef: MatDialogRef<CommitteeMemberComponent>;
  constructor(
    private translationService: TranslationService,
    private fb: FormBuilder,
    public _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.createForm();

    this.dataSource.data.push({
      name: "sameh",
      committeeRole: "controller",
      memberRole: "Director",
    });
  }

  createForm() {
    this.exerciseForm = this.fb.group({
      director: [""],
      deputyDirector: [""],
    });
  }

  onSubmit() {}

  openMemberMoadal(type, item) {
    this.DialogRef = this._matDialog.open(CommitteeMemberComponent, {
      disableClose: false,
      panelClass: "modal",
      data: {
        type: type,
        item: item,
      },
    });

    this.DialogRef.afterClosed().subscribe((data) => {
      if (data) {
      }
    });
  }
}
