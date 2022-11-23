import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { CommunicationService } from '../services/communication.service';
import { AddMealPlanComponent } from './add-plan/add-mealplan.component';
import { DeleteMealPlanComponent } from './delete-plan/delete-mealplan.component';
import { ModifyMealPlanComponent } from './modify-plan/modify-mealplan.component';
import { MealPlan } from '../../../../common/tables/MealPlan';
import { MatTable } from '@angular/material/table';

const mockMealPlans : MealPlan[] =  [{
  planNumber: 13,
    category: 'Keto',
    frequency: 7,
    numberOfPeople: 24,
    numberOfCalories: 12,
    price: 12,
    supplierNumber: 127,
},{
  planNumber: 90,
    category: 'Herbivore',
    frequency: 7,
    numberOfPeople: 24,
    numberOfCalories: 12,
    price: 12,
    supplierNumber: 127,
},
{
  planNumber: 113,
    category: 'Carnivore',
    frequency: 8,
    numberOfPeople: 820,
    numberOfCalories: 248,
    price: 34,
    supplierNumber: 127,
},
{
  planNumber: 29,
    category: 'Paleo',
    frequency: 2,
    numberOfPeople: 529,
    numberOfCalories: 280,
    price: 67,
    supplierNumber: 127,
}
];


@Component({
  selector: 'app-edit-mealplan',
  templateUrl: './edit-mealplan.component.html',
  styleUrls: ['./edit-mealplan.component.css']
})
export class EditMealPlanComponent implements OnInit {

  mealPlans: MealPlan[];
  displayedColumns: string[] = ['numeroPlan', 'categorie', 'frequence', 'nbPersonnes', 'nbCalories', 'prix', 'numeroFournisseur', 'actions'];
  @ViewChild(MatTable) table: MatTable<any>;
  
  constructor(public dialog: MatDialog, 
    //private readonly communicationService: CommunicationService
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
    this.mealPlans = mockMealPlans; // replace by communication service get all meal plans

    // this.communicationService.getAllMealPlans().subscribe((mealPlans: MealPlan[]) => {
    //   this.mealPlans = mealPlans ? mealPlans : [];
    // });
  }
}
