import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealPlan } from '../../../../common/tables/MealPlan';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})
export class MealPlanComponent implements OnInit {
 
  mealPlans: MealPlan[];
  displayedColumns: string[] = ['planNumber', 'category', 'frequency', 'numberOfPeople', 'numberOfCalories', 'price', 'supplierNumber'];
  
  constructor(
    public dialog: MatDialog,
    private readonly communicationService: CommunicationService
    ) {}

  ngOnInit(): void {
    this.getAllMealPlans();
  }

  private getAllMealPlans(): void {
    this.communicationService.getAllMealPlans().subscribe((mealPlans: MealPlan[]) => {
      this.mealPlans = mealPlans ? mealPlans : [];
      this.mealPlans = this.mealPlans.sort((p1, p2) => (p1.planNumber > p2.planNumber) ? 1 : (p1.planNumber < p2.planNumber) ? -1 : 0);
    });
  }

}
