import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { MealPlan } from "../../../../common/tables/MealPlan";
import { Supplier } from "../../../../common/tables/Supplier";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:8000/database";
  public constructor(private readonly http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  getAllMealPlans(): Observable<MealPlan[]> {
    return this.http
      .get<MealPlan[]>(this.BASE_URL + "/mealPlans")
      .pipe(catchError(this.handleError<MealPlan[]>("getAllMealPlans")));
  }

  public insertMealPlan(mealPlan: MealPlan): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/mealPlans", mealPlan)
      .pipe(catchError(this.handleError<number>("insertMealPlan")));
  }
  
  public updateMealPlan(mealPlan: MealPlan): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/mealPlans", mealPlan)
      .pipe(catchError(this.handleError<number>("updateMealPlan")));
  }

  public deleteMealPlan(mealPlanNumber: number): Observable<number> {
    return this.http
      .delete<number>(this.BASE_URL + `/mealPlans/${mealPlanNumber}`)
      .pipe(catchError(this.handleError<number>("deleteMealPlan")));
  }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http
      .get<Supplier[]>(this.BASE_URL + `/suppliers`)
      .pipe(catchError(this.handleError<Supplier[]>("getAllSuppliers")));
  }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
