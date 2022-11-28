import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../services/communication.service';
import { MealPlan } from '../../../../common/tables/MealPlan';

@Component({
  selector: 'app-plans-repas',
  templateUrl: './plans-repas.component.html',
  styleUrls: ['./plans-repas.component.css']
})
export class PlansRepasComponent implements OnInit {
  mealPlans: MealPlan[];
  displayedColumns: string[] = [
    'numeroPlan',
    'categorie',
    'frequence',
    'nbPersonnes',
    'nbCalories',
    'prix',
    'numeroFournisseur'
  ]

  constructor(private readonly communicationService: CommunicationService) { }

  ngOnInit(): void {
    this.getAllMealPlans();
  }

  private getAllMealPlans(): void {
    this.communicationService.getAllMealPlans().subscribe((mealPlans: MealPlan[]) => {
      this.mealPlans = mealPlans ? mealPlans : [];
      console.log(mealPlans);
    });
  }

}
