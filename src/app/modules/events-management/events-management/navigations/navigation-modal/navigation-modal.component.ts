import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { EventsManagementService } from "../../../events-management.service";

@Component({
  selector: "app-navigation-modal",
  templateUrl: "./navigation-modal.component.html",
  styleUrls: ["./navigation-modal.component.scss"],
})
export class NavigationModalComponent implements OnInit {
  lang = "en";
  id: string;
  isAddMode: boolean;
  formGroup: FormGroup;
  // modules filter
  modules: any[] = [];
  filterModules = [];
  selectedId: any;
  selectedValue: string;

  modulesSpinner = true;
  //
  constructor(
    private formBuilder: FormBuilder,
    private _service: EventsManagementService,
    private translationService: TranslationService,
    public dialogRef: MatDialogRef<NavigationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data["type"] == "edit") {
      this.id = this.data["id"];
    }

    this.isAddMode = !this.id;
    this.lang = this.translationService.getSelectedLanguage();

    this.createForm();

    this._service.onNavigationsChange.subscribe((data) => {
      data = [
        {
          nameEn: "Not set",
          nameAr: "لا يوجد",
          id: 0,
        },
        ...data,
      ];
      this.modules = data;

      this.filterModules = data;
      this.modulesSpinner = false;
      this.formGroup.get("parent").enable();

      let parentObj = this.modules.find(
        (item) => item.id == this.data.parent?.id
      );
      this.formGroup.get("parent").setValue(parentObj);

      this.formGroup.get("parent").valueChanges.subscribe((data) => {
        this.modulesSpinner = true;
        this.applyFilter(data);
      });
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      nameAr: ["", [Validators.required]],
      nameEn: ["", Validators.required],

      descAr: [""],
      descEn: [""],

      active: [true, [Validators.required]],
      code: ["", Validators.required],
      parent: [],
      id: 0,
      icon: "",
      modules: [[]],
      tableName: "",
      widget: true,
      routing: "",
      isPublic: "",
      order: "",
    });

    if (!this.isAddMode) {
      delete this.data["type"];
      this.formGroup.patchValue(this.data);
    }
  }
  private createItem(newItem) {
    this._service.createNavigationsMenu(newItem).then((ok) => {
      this.dialogRef.close();
    });
  }

  private updateItem(newItem) {
    this._service.updateNavigationItem(newItem).then((ok) => {
      this.dialogRef.close();
    });
  }

  onSubmit() {
    let newItem = this.formGroup.value;
    if (newItem.parent && newItem["parent"].id != 0) {
      newItem["parent"] = { id: newItem["parent"].id, label: "module" };
    } else newItem["parent"] = null;

    if (this.formGroup.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createItem(newItem);
    } else {
      this.updateItem(newItem);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  /* modules  parent  filter*/
  applyFilter(value) {
    const filterValue = value;
    if (typeof value == "string" && filterValue.replace(/\s/g, "").length) {
      this.filterModules = this.modules.filter((item) => {
        if (item.nameEn && item.nameEn.toLowerCase().indexOf(filterValue) > -1)
          return item;
        if (item.nameAr && item.nameAr.toLowerCase().indexOf(filterValue) > -1)
          return item;
      });
    } else {
      this.filterModules = this.modules;
    }
    this.modulesSpinner = false;
  }

  displayFn(subject) {
    return subject ? subject.nameEn + " - " + subject.nameAr : undefined;
  }
}
