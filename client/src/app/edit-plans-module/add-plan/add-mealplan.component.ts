import { Component, Inject, OnInit } from "@angular/core";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Supplier } from "../../../../../common/tables/Supplier";
import { DialogData } from "../../../../../common/communication/dialog-data";
import { CommunicationService } from "src/app/services/communication.service";
import { PendingQueryComponent } from "../pending-query/pending-query.component";
import { MealPlan } from "../../../../../common/tables/MealPlan";

const SMALLINT_MAX = 32767;
const INT_MAX = 2147483647;
const DEFAULT_CATEGORIES = ["Chinois", "Mexicain", "Barbecue/grill"];

@Component({
  selector: "AddMealPlanComponent",
  templateUrl: "./add-mealplan.component.html",
  styleUrls: ["./add-mealplan.component.css"],
})

export class AddMealPlanComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;

  planNumber: number = 1;
  category: string;
  frequency: number;
  numberOfPeople: number;
  numberOfCalories: number;
  price: number;
  supplierNumber: number;
  constraintViolation: boolean = false;

  suppliers: Supplier[] = [];
  mealPlans: MealPlan[] = [];
  categories: string[] = DEFAULT_CATEGORIES;

  pending: boolean = true;
  success: boolean = false;
  planNumberAlreadyExist = false;
  supplierNumberDoesntExist = false;

  mealPlanInsertError: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddMealPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly communicationService: CommunicationService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ["", Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ["", Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ["", Validators.required],
    });
    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ["", Validators.required],
    });
    this.seventhFormGroup = this._formBuilder.group({
      seventhCtrl: ["", Validators.required],
    });
    
    this.getAllMealPlans();
    this.getAllSuppliers();
    setTimeout(() => { this.setInputsMaxLength(); this.loadDefaultValues();  }, 250); 
  }

  loadDefaultValues(): void {
    this.planNumber = this.generateNewPlanNumber();
    this.category = this.categories[Math.floor(Math.random() * this.categories.length)] || "Fast Food";
    this.frequency = 3; 
    this.numberOfPeople = 4;
    this.numberOfCalories = 3200;
    this.price = 37.25;
    this.supplierNumber = 2;
  }

  generateNewPlanNumber(): number {
    let maxExistingPlanNumber = 0;
    for (const mealPlan of this.mealPlans) {
      if (mealPlan.planNumber > maxExistingPlanNumber) 
        maxExistingPlanNumber = mealPlan.planNumber;
    }
    return maxExistingPlanNumber + 1;
  }

  setInputsMaxLength(): void {
    document.querySelectorAll('input[type="number"]').forEach((input: HTMLInputElement) => {
      input.oninput = () => {
        if (input.value.length > input.maxLength)
          input.value = input.value.slice(0, input.maxLength);
      }
    });
  }

  openPendingDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "650px";
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      planNumberAlreadyExist: this.planNumberAlreadyExist,
      supplierNumberDoesntExist: this.supplierNumberDoesntExist,
      constraintViolation: this.constraintViolation
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  addMealPlan(): void {
    this.openPendingDialog();

    if (this.checkConstraints()) {
      this.communicationService
        .insertMealPlan({
          planNumber: this.planNumber,
          category: this.category,
          frequency: this.frequency,
          numberOfPeople: this.numberOfPeople,
          numberOfCalories: this.numberOfCalories,
          price: this.price,
          supplierNumber: this.supplierNumber,
        } as MealPlan).subscribe((result: number | any) => {
          if (typeof result !== "number") {
            if (result.detail.includes("numeroplan"))
              this.planNumberAlreadyExist = true;
            else if (result.detail.includes("numerofournisseur"))
              this.supplierNumberDoesntExist = true;
          } else this.success = true;
        })
    } else this.constraintViolation = true;

    setTimeout(() => {  
      this.pending = false;
      this.openPendingDialog();
    }, 500);
      
  }

  checkConstraints(): boolean {
    return (
      this.planNumber <= INT_MAX &&
      this.frequency <= SMALLINT_MAX &&
      this.numberOfPeople <= SMALLINT_MAX &&
      this.numberOfCalories <= SMALLINT_MAX &&
      this.price <= 9999.99 &&
      this.supplierNumber <= INT_MAX
    );
  }

  getAllMealPlans(): void {
    this.communicationService.getAllMealPlans().subscribe((mealPlans: MealPlan[]) => {
      this.mealPlans = mealPlans ? mealPlans : [];
      for (const mealPlan of this.mealPlans) {
        if (!this.categories.includes(mealPlan.category))
          this.categories.push(mealPlan.category);
      }
    });
  }

 getAllSuppliers(): void {
   this.communicationService
     .getAllSuppliers()
     .subscribe((suppliers: Supplier[]) => {
       this.suppliers = suppliers ? suppliers : [];
     });
 }

}
