import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from "@angular/core";
import { Direction } from "@angular/cdk/bidi";

import { IThemeFacade } from "@core/facades/theme.facade";

import { TranslationService } from "src/app/modules/i18n/translation.service";

import { distinctUntilChanged, map } from "rxjs/operators";
import { Observable } from "rxjs";

import { IStorageService } from "src/app/core/services/storage.service";
import { LayoutService } from "../../../../_metronic/core";
import { NotifService } from "../../../../core/api/services/notif.service";
import { KTUtil } from "../../../../../assets/js/components/util";
import KTLayoutHeaderTopbar from "../../../../../assets/js/layout/base/header-topbar";
import KTLayoutQuickActions from "../../../../../assets/js/layout/extended/quick-actions";
import KTLayoutQuickCartPanel from "../../../../../assets/js/layout/extended/quick-cart";
import KTLayoutQuickNotifications from "../../../../../assets/js/layout/extended/quick-notifications";
import KTLayoutQuickPanel from "../../../../../assets/js/layout/extended/quick-panel";
import KTLayoutQuickSearch from "../../../../../assets/js/layout/extended/quick-search";
import KTLayoutQuickUser from "../../../../../assets/js/layout/extended/quick-user";

@Component({
  selector: "app-topbar",
  templateUrl: "./topbar.component.html",
  styleUrls: ["./topbar.component.scss"],
})
export class TopbarComponent implements OnInit, AfterViewInit {
  @Output() openSideMenu: EventEmitter<any> = new EventEmitter();
  @Input() isMobileView = false;

  user$: Observable<any>;
  notifCount$: Observable<number>;
  dir: Direction;
  currentTheme: "dark" | "light" = "light";
  // tobbar extras
  extraSearchDisplay: boolean;
  extrasSearchLayout: "offcanvas" | "dropdown";
  extrasNotificationsDisplay: boolean;
  extrasNotificationsLayout: "offcanvas" | "dropdown";
  extrasQuickActionsDisplay: boolean;
  extrasQuickActionsLayout: "offcanvas" | "dropdown";
  extrasCartDisplay: boolean;
  extrasCartLayout: "offcanvas" | "dropdown";
  extrasQuickPanelDisplay: boolean;
  extrasLanguagesDisplay: boolean;
  extrasUserDisplay: boolean;
  extrasUserLayout: "offcanvas" | "dropdown";

  constructor(
    private layout: LayoutService,
    // private _theme: ThemeService,
    private translationService: TranslationService,
    private storageService: IStorageService,
    private notificationService: NotifService,
    private themeFacade: IThemeFacade
  ) {}

  ngOnInit(): void {
    // topbar extras
    this.extraSearchDisplay = this.layout.getProp("extras.search.display");
    this.extrasSearchLayout = this.layout.getProp("extras.search.layout");
    this.extrasNotificationsDisplay = this.layout.getProp(
      "extras.notifications.display"
    );
    this.extrasNotificationsLayout = this.layout.getProp(
      "extras.notifications.layout"
    );
    this.extrasQuickActionsDisplay = this.layout.getProp(
      "extras.quickActions.display"
    );
    this.extrasQuickActionsLayout = this.layout.getProp(
      "extras.quickActions.layout"
    );
    this.extrasCartDisplay = this.layout.getProp("extras.cart.display");
    this.extrasCartLayout = this.layout.getProp("extras.cart.layout");
    this.extrasLanguagesDisplay = this.layout.getProp(
      "extras.languages.display"
    );
    this.extrasUserDisplay = this.layout.getProp("extras.user.display");
    this.extrasUserLayout = this.layout.getProp("extras.user.layout");
    this.extrasQuickPanelDisplay = this.layout.getProp(
      "extras.quickPanel.display"
    );

    this.user$ = this.storageService.getState<any>("commonData").pipe(
      map((d) => d?.currentUserDetails),
      distinctUntilChanged()
    );

    this.dir =
      this.translationService.getSelectedLanguage() == "en" ? "ltr" : "rtl";

    // this.socketio.realTimeDataStream$.subscribe((_) => {
    //   console.log("here", "tttttttttttt");
    //   this.notificationService.increaseCount();
    // });

    // this.notificationService.refreshCount();
    // this.notifCount$ = this.notificationService.unreadCount$;
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      // Add 'implements AfterViewInit' to the class.
      if (this.extraSearchDisplay && this.extrasSearchLayout === "offcanvas") {
        KTLayoutQuickSearch.init("kt_quick_search");
      }

      if (
        this.extrasNotificationsDisplay &&
        this.extrasNotificationsLayout === "offcanvas"
      ) {
        // Init Quick Notifications Offcanvas Panel
        KTLayoutQuickNotifications.init("kt_quick_notifications");
      }

      if (
        this.extrasQuickActionsDisplay &&
        this.extrasQuickActionsLayout === "offcanvas"
      ) {
        // Init Quick Actions Offcanvas Panel
        KTLayoutQuickActions.init("kt_quick_actions");
      }

      if (this.extrasCartDisplay && this.extrasCartLayout === "offcanvas") {
        // Init Quick Cart Panel
        KTLayoutQuickCartPanel.init("kt_quick_cart");
      }

      if (this.extrasQuickPanelDisplay) {
        // Init Quick Offcanvas Panel
        KTLayoutQuickPanel.init("kt_quick_panel");
      }

      if (this.extrasUserDisplay && this.extrasUserLayout === "offcanvas") {
        // Init Quick User Panel
        KTLayoutQuickUser.init("kt_quick_user");
      }

      // Init Header Topbar For Mobile Mode
      KTLayoutHeaderTopbar.init("kt_header_mobile_topbar_toggle");
    });
  }

  panelOpened() {
    this.notificationService.toggleSidebarVisibility();
  }

  changeTheme() {
    this.currentTheme == "light"
      ? (this.currentTheme = "dark")
      : (this.currentTheme = "light");
    this.themeFacade.setTheme(
      this.themeFacade.stateSnapshot.ActiveTheme == "light" ? "dark" : "light"
    );
  }



  sideMenu() {
    this.openSideMenu.emit();
  }
}
