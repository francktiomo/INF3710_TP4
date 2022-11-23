import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MealPlan } from '../../../../common/tables/MealPlan';
// import { CommunicationService } from '../services/communication.service';


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
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.css']
})
export class MealPlanComponent implements OnInit {
 
  mealPlans: MealPlan[];
  displayedColumns: string[] = ['numeroPlan', 'categorie', 'frequence', 'nbPersonnes', 'nbCalories', 'prix', 'numeroFournisseur'];
  

  constructor(
    public dialog: MatDialog,
    // private readonly communicationService: CommunicationService
    ) {}

  ngOnInit(): void {
    this.getAllMealPlans();
  }


  private getAllMealPlans(): void {
    this.mealPlans = mockMealPlans; // Replace this by communication service method when implemented

    // this.communicationService.getAllJardins().subscribe((jardins: Jardin[]) => {
    //   this.plansRepas = jardins ? jardins : [];
    // });


  }

}
