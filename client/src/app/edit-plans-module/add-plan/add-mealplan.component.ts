import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DialogData } from "../../../../../common/communication/dialog-data";
import { CommunicationService } from "../../services/communication.service";
import { PendingQueryComponent } from "../pending-query/pending-query.component";
import { MealPlan } from "../../../../../common/tables/MealPlan";
import { Supplier } from "../../../../../common/tables/Supplier";

@Component({
  selector: "AddMealPlanComponent",
  templateUrl: "./add-mealplan.component.html",
  styleUrls: ["./add-mealplan.component.css"],
})
export class AddMealPlanComponent implements OnInit {
  formGroups: FormGroup[];
  mealPlan: MealPlan;

  mealPlans: MealPlan[];
  suppliers: Supplier[];

  placeholderMP: boolean = false;
  placeholderPR: boolean = false;
  placeholderMEP: boolean = false;
  pending: boolean = true;
  success: boolean = false;
  prodInsertError: boolean = false;
  adaptInsertError: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddMealPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly communicationService: CommunicationService
  ) { }

  ngOnInit() {
    this.formGroups = [
      this._formBuilder.group({
        firstCtrl: ["", Validators.required],
      }),
      this._formBuilder.group({
        secondCtrl: ["", Validators.required],
      }),
      this._formBuilder.group({
        thirdCtrl: ["", Validators.required],
      }),
      this._formBuilder.group({
        fourthCtrl: ["", Validators.required],
      }),
      this._formBuilder.group({
        fifthCtrl: ["", Validators.required],
      }),
      this._formBuilder.group({
        sixthCtrl: ["", Validators.required],
      }),
      this._formBuilder.group({
        seventhCtrl: ["", Validators.required],
      }),
    ];

    this.getAllMealPlans();
    this.getAllSuppliers();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "650px";
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      prodInsertError: this.prodInsertError,
      adaptInsertError: this.adaptInsertError,
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  allFieldAreCompleted(): boolean {
    return (this.mealPlan.planNumber !== null) && (this.mealPlan.category !== null) && (this.mealPlan.frequency !== null) && (this.mealPlan.numberOfPeople !== null) && (this.mealPlan.numberOfCalories !== null) && (this.mealPlan.price !== null) && (this.mealPlan.supplierNumber !== null);
  }

  addMealPlan(): void {

    this.openDialog();
    this.communicationService
      .insertMealPlan({
        planNumber: this.mealPlan.planNumber,
        category: this.mealPlan.category,
        frequency: this.mealPlan.frequency,
        numberOfPeople: this.mealPlan.numberOfPeople,
        numberOfCalories: this.mealPlan.numberOfCalories,
        price: this.mealPlan.price,
        supplierNumber: this.mealPlan.supplierNumber,
      } as MealPlan);
  }

  getSetOfNomsSuppliers(): Set<string> | undefined {
    if (!this.suppliers) return;
    const setOfNomsSuppliers: Set<string> = new Set<string>();
    this.suppliers.forEach((supplier: Supplier) =>
      setOfNomsSuppliers.add(supplier.supplierName)
    );
    return setOfNomsSuppliers;
  }

  resetPlaceHolderMP(): void {
    this.placeholderMP = false;
  }

  resetPlaceHolderPR(): void {
    this.placeholderPR = false;
  }

  resetPlaceHolderMEP(): void {
    this.placeholderMEP = false;
  }

  private getAllMealPlans(): void {
    // this.communicationService.getAllVarietes().subscribe((mealPlans: MealPlan[]) => {
    //   this.mealPlans = mealPlans ? mealPlans : [];
    // });
  }

  private getAllSuppliers(): void {
    // this.communicationService.getAllSemencier().subscribe((suppliers: Supplier[]) => {
    //   this.suppliers = suppliers ? suppliers : [];
    // });
  }
}
