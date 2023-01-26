import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "src/app/modules/confirm-dialog/confirm-dialog.component";
import { TranslationService } from "src/app/modules/i18n/translation.service";

@Component({
  selector: "app-receivers-list",
  templateUrl: "./receivers-list.component.html",
  styleUrls: ["./receivers-list.component.scss"],
})
export class ReceiversListComponent implements OnInit {
  lang = "";
  items = [];
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private translationService: TranslationService,
    @Inject(MAT_DIALOG_DATA) public recivers: any
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    for (var i in this.recivers) this.items.push(this.recivers[i]);
  }
}
