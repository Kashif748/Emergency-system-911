import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { TranslationService } from "src/app/modules/i18n/translation.service";
import { UserService } from "@core/api/services/user.service";

@Component({
  selector: "app-opt-user-dialog",
  templateUrl: "./opt-user-dialog.component.html",
  styleUrls: ["./opt-user-dialog.component.scss"],
})
export class OptUserDialogComponent implements OnInit {
  userId;

  private users: any[] = [];
  private usersStore = new BehaviorSubject<any[]>(this.users);
  public users$ = this.usersStore.asObservable();

  private pageIndex = 0;
  private lastPage = 10000;
  private pageSize = 10;
  private async _nextPage() {
    const page = await this.userService
      .getAll(null, this.pageIndex, this.pageSize)
      .pipe(
        tap((r) => {
          this.lastPage = Math.ceil(r.result.totalElements / this.pageSize) - 1;
        }),
        map((r) => r.result.content)
      )
      .toPromise();

    this.users = [...this.users, ...page];
    this.usersStore.next(this.users);
  }

  async getNext() {
    if (this.pageIndex <= this.lastPage) {
      await this._nextPage();
      this.pageIndex++;
    }
  }
  lang = "en";
  constructor(
    public dialogRef: MatDialogRef<OptUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private translate: TranslationService
  ) {
    this.lang = this.translate.getSelectedLanguage();
  }
  async ngOnInit(): Promise<void> {
    await this.getNext();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
