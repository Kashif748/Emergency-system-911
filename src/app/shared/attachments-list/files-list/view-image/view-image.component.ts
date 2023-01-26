import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-view-image",
  templateUrl: "./view-image.component.html",
  styleUrls: ["./view-image.component.scss"],
})
export class ViewImageComponent {
  // Variables
  imageUUID = "";
  imageLoading = true;
  imageLoadingFail = false;

  constructor(
    public dialogRef: MatDialogRef<ViewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imageUUID = data["imageUUID"];
  }

  loadingFail(e) {
    setTimeout(() => {
      this.imageLoadingFail = true;
      this.imageLoading = false;
    }, 500);
  }

  reloadImage() {
    this.imageLoadingFail = false;
    this.imageLoading = true;
    const tempUUID = this.imageUUID;
    this.imageUUID = "";
    this.imageUUID = tempUUID;
  }
}
