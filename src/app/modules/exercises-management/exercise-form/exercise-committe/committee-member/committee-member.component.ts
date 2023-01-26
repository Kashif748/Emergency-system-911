import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-committee-member",
  templateUrl: "./committee-member.component.html",
  styleUrls: ["./committee-member.component.scss"],
})
export class CommitteeMemberComponent implements OnInit {
  exerciseForm: FormGroup;
  dir = "";
  constructor(
    public dialogRef: MatDialogRef<CommitteeMemberComponent>,
    private _translateService: TranslateService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.dir = this._translateService.currentLang === "en" ? "ltr" : "rtl";
    this.createForm();
  }

  createForm() {
    this.exerciseForm = this.fb.group({
      memberName: [""],
      committeeRole: [""],
      memberRole: [""],
    });
  }

  onSubmit() {}
}
