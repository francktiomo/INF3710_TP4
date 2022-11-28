import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { DialogData } from "../../../../../common/communication/dialog-data";
import { PendingQueryComponent } from "../pending-query/pending-query.component";
import { CommunicationService } from "../../services/communication.service";

@Component ({
  selector: 'DeleteMealPlanComponent',
  templateUrl: './delete-mealplan.component.html',
  styleUrls: ['./delete-mealplan.component.css'],
})

export class DeleteMealPlanComponent {
  pending: boolean = true;
  success: boolean = false;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DeleteMealPlanComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly communicationService: CommunicationService) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      delete: true
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  deleteMealPlan(): void {
    this.openDialog();
    this.communicationService.deleteMealPlan(this.data.mealPlan.planNumber).subscribe((response: number) => {
      if (response !== -1) {
        this.success = true;
      }
      this.pending = false;
      this.openDialog();
    });
    this.pending = true;
    this.success = false;
  }
}
