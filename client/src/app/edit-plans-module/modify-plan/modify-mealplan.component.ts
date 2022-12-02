import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../../common/communication/dialog-data";
import { CommunicationService } from "../../services/communication.service";
import { Supplier } from "../../../../../common/tables/Supplier";
import { MealPlan } from "../../../../../common/tables/MealPlan";
import { PendingQueryComponent } from "../pending-query/pending-query.component";

const SMALLINT_MAX = 32767;
const INT_MAX = 2147483647;
const DEFAULT_CATEGORIES = ["Chinois", "Mexicain", "Barbecue/grill"];

@Component ({
  selector: 'ModifyMealPlanComponent',
  templateUrl: './modify-mealplan.component.html',
  styleUrls: ['./modify-mealplan.component.css', '.././add-plan/add-mealplan.component.css'],
})

export class ModifyMealPlanComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  seventhFormGroup: FormGroup;

  planNumber: number;
  category: string;
  frequency: number;
  numberOfPeople: number;
  numberOfCalories: number;
  price: number;
  supplierNumber: number;
  constraintViolation: boolean = false;

  suppliers: Supplier[];
  mealPlans: MealPlan[] = [];
  categories: string[] = DEFAULT_CATEGORIES;
  
  pending: boolean = true;
  success: boolean = false;


  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<ModifyMealPlanComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly communicationService: CommunicationService) {}

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
    
    setTimeout(() => { this.loadValues(); this.setInputsMaxLength();  }, 250); 
  }

  setInputsMaxLength(): void {
    document.querySelectorAll('input[type="number"]').forEach((input: HTMLInputElement) => {
      input.oninput = () => {
        if (input.value.length > input.maxLength)
          input.value = input.value.slice(0, input.maxLength);
      }
    });
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

  loadValues(): void {
    if (!this.data || !this.data.mealPlan) return;
    for (const mealPlan of this.mealPlans) {
      if (mealPlan.planNumber === this.data.mealPlan.planNumber) {
        this.planNumber = this.data.mealPlan.planNumber;
        this.category = this.data.mealPlan.category;
        this.frequency = this.data.mealPlan.frequency;
        this.numberOfPeople = this.data.mealPlan.numberOfPeople;
        this.numberOfCalories = this.data.mealPlan.numberOfCalories;
        this.price = this.data.mealPlan.price;
        this.supplierNumber = this.data.mealPlan.supplierNumber;
      }
    }
  }

  async openPendingDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      update: true,
      constraintViolation: this.constraintViolation
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  modifyMealPlan(): void {
    this.openPendingDialog();

    if (this.checkConstraints()) {
      this.communicationService
        .updateMealPlan({
          planNumber: this.planNumber,
          category: this.category,
          frequency: this.frequency,
          numberOfPeople: this.numberOfPeople,
          numberOfCalories: this.numberOfCalories,
          price: this.price,
          supplierNumber: this.supplierNumber,
        } as MealPlan).subscribe((result: number | any) => {
          if (result !== -1)
            this.success = true;
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

}
