import { Component, OnInit } from "@angular/core";
import { ILangFacade } from "@core/facades/lang.facade";
import { HostListener } from "@angular/core";
// import Swiper core and required modules
import SwiperCore, { Autoplay } from "swiper/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { VideoPlayerComponent } from "./video-player/video-player.component";
import { TranslationService } from "../i18n/translation.service";
import { galaryImages, iso, orgsLogos, universities } from "./temp-data";

// install Swiper modules
SwiperCore.use([Autoplay]);

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
})
export class LandingPageComponent implements OnInit {
  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    let element = document.querySelector(".header-area") as HTMLElement;

    if (window.pageYOffset > 200) {
      element.classList.remove("header-top");
      this.lang == "en" ? (this.logo = "H-En") : (this.logo = "H-Ar");
    } else {
      element.classList.add("header-top");
      this.lang == "en" ? (this.logo = "dark-En") : (this.logo = "dark-Ar");
    }
  }

  logo = "dark-En";
  lang = "en";
  universitiesList = universities;
  galaryImages = galaryImages;
  iso = iso;

  orgsLogos = orgsLogos;
  DialogRef: MatDialogRef<any>;
  constructor(
    private langFacade: ILangFacade,
    public _matDialog: MatDialog,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.onWindowScroll();
  }

  openVideoPlayer() {
    this.DialogRef = this._matDialog.open(VideoPlayerComponent, {
      disableClose: false,
      panelClass: "player-modal",
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }
}
