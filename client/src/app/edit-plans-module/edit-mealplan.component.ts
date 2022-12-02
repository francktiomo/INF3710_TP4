import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommunicationService } from '../services/communication.service';
import { AddMealPlanComponent } from './add-plan/add-mealplan.component';
import { DeleteMealPlanComponent } from './delete-plan/delete-mealplan.component';
import { ModifyMealPlanComponent } from './modify-plan/modify-mealplan.component';
import { MealPlan } from '../../../../common/tables/MealPlan';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-edit-mealplan',
  templateUrl: './edit-mealplan.component.html',
  styleUrls: ['./edit-mealplan.component.css']
})
export class EditMealPlanComponent implements OnInit {

  mealPlans: MealPlan[];
  displayedColumns: string[] = ['planNumber', 'category', 'frequency', 'numberOfPeople', 'numberOfCalories', 'price', 'supplierNumber', 'actions'];
  @ViewChild(MatTable) table: MatTable<any>;
  
  constructor(public dialog: MatDialog, 
    private readonly communicationService: CommunicationService
    ) {}

  ngOnInit() {
    this.getAllMealPlans();
  }

  openModifyDialog(mealPlan: MealPlan) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.maxWidth = '650px';
    dialogConfig.data = {
      mealPlan
    };
    this.dialog.open(ModifyMealPlanComponent, dialogConfig);
  }

  openDeleteDialog(mealPlan: MealPlan) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.maxWidth = '650px';
    dialogConfig.data = {
      mealPlan
    };
    this.dialog.open(DeleteMealPlanComponent, dialogConfig);
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.maxWidth = '650px';
    this.dialog.open(AddMealPlanComponent, dialogConfig);
  }

  private getAllMealPlans(): void {
    this.communicationService.getAllMealPlans().subscribe((mealPlans: MealPlan[]) => {
      this.mealPlans = mealPlans ? mealPlans : [];
      this.mealPlans = this.mealPlans.sort((p1, p2) => (p1.planNumber > p2.planNumber) ? 1 : (p1.planNumber < p2.planNumber) ? -1 : 0);
    });
  }

}
