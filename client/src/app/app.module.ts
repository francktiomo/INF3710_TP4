import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { MealPlanComponent } from './mealplan/mealplan.component';
import { EditMealPlanComponent } from './edit-plans-module/edit-mealplan.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddMealPlanComponent } from "./edit-plans-module/add-plan/add-mealplan.component";
import { PendingQueryComponent } from "./edit-plans-module/pending-query/pending-query.component";
import { ModifyMealPlanComponent } from "./edit-plans-module/modify-plan/modify-mealplan.component";
import { DeleteMealPlanComponent } from "./edit-plans-module/delete-plan/delete-mealplan.component";

@NgModule({
  declarations: [
    AppComponent,
    MealPlanComponent,
    EditMealPlanComponent,
    AddMealPlanComponent,
    PendingQueryComponent,
    ModifyMealPlanComponent,
    DeleteMealPlanComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  entryComponents: [AddMealPlanComponent, PendingQueryComponent, ModifyMealPlanComponent, DeleteMealPlanComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
