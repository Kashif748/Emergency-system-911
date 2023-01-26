import { Component, Input, OnInit } from "@angular/core";
import { Direction } from "@angular/cdk/bidi";

import { Observable } from "rxjs";

import { IAuthService } from "src/app/core/services/auth.service";
import { IStorageService } from "src/app/core/services/storage.service";

import { distinctUntilChanged, map, share, tap } from "rxjs/operators";

import { LayoutService } from "../../../../../core";
import { UserService } from "@core/api/services/user.service";
@Component({
  selector: "app-user-dropdown-inner",
  templateUrl: "./user-dropdown-inner.component.html",
  styleUrls: ["./user-dropdown-inner.component.scss"],
})
export class UserDropdownInnerComponent implements OnInit {
  @Input("dir") dir: Direction;
  @Input() isMobileView = false;


  extrasUserDropdownStyle: "light" | "dark" = "light";
  user$: Observable<any>;
  profileImgUUID$: Observable<string>;
  constructor(
    private layout: LayoutService,
    private authService: IAuthService,
    private storageService: IStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.extrasUserDropdownStyle = this.layout.getProp(
      "extras.user.dropdown.style"
    );

    this.user$ = this.storageService.getState<any>("commonData").pipe(
      map((d) => d?.currentUserDetails),
      distinctUntilChanged(),
      tap((user) => {
        this.profileImgUUID$ = this.userService.userFiles(user?.id, "19").pipe(
          map((res: any) => {
            try {
              const imgs: any[] = res.result;
              if (imgs?.length > 0) {
                return imgs[imgs.length - 1]?.uuid;
              } else {
                return null;
              }
            } catch {
              return null;
            }
          }),
          share()
        );
      })
    );
  }

  async logout() {
    await this.authService.signOutAsync();
  }
}
