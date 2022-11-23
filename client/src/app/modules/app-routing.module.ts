import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "../app.component";
import { MealPlanComponent } from '../mealplan/mealplan.component';
import { EditMealPlanComponent} from '../edit-plans-module/edit-mealplan.component';

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "mealplans", component: MealPlanComponent },
  { path: "edit-mealplans", component: EditMealPlanComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
