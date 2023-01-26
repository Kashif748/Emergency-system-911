import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";

import { ConfirmDialogComponent } from "src/app/modules/confirm-dialog/confirm-dialog.component";

import { EventsManagementService } from "../../events-management.service";
import { EntityModel } from "../controller-view/reports-via";

import { EmergencyLevelModalComponent } from "./emergency-level-modal/emergency-level-modal.component";

@Component({
  selector: "app-emergency-level",
  templateUrl: "./emergency-level.component.html",
  styleUrls: ["./emergency-level.component.scss"],
})
export class EmergencyLevelComponent implements OnInit {
  @Input("controllerName") controllerName: string;

  DialogRef: MatDialogRef<any>;

  data: EntityModel[];
  displayedColumns: string[] = ["id", "level", "Active", "actions"];

  dataSource: any;

  constructor(
    private _service: EventsManagementService,
    public _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this._service.onEmergencyLevel.subscribe((data) => {
      this.data = data;
      this.dataSource.data = this.data;
    });
  }

  openModal(type, id) {
    this.DialogRef = this._matDialog.open(EmergencyLevelModalComponent, {
      disableClose: false,
      panelClass: "modal",
      data: { type: type, id: id, controllerName: this.controllerName },
    });
  }

  deleteReport(group) {
    this.DialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false,
      panelClass: "modal",
    });

    this.DialogRef.componentInstance.confirmMessage = "GENERAL.DELETE_CONFIRM";
    this.DialogRef.componentInstance.icon = "error_outline";
    this.DialogRef.componentInstance.actionName = "ACTIONS.DELETE";

    this.DialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this._service.deleteEmergencyLevel(groupId);
        this._service.updateEmergencyLevel(group.id, {
          ...group,
          isActive: false,
        });
      }
      this.DialogRef = null;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageChanged(event) {
  }
}
