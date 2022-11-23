
import { MealPlan } from "../tables/MealPlan";

export interface DialogData {
  mealPlan: MealPlan;
  pending: boolean;
  success: boolean;

  update: boolean;
  delete: boolean;
  add: boolean;

  mealPlanNumberAlreadyExist:boolean;
  // prodInsertError: boolean;
  // adaptInsertError: boolean;
}
