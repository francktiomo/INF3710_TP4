import { Component, Inject, OnInit } from "@angular/core";
import {FormBuilder,FormGroup,Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig,MatDialogRef,MAT_DIALOG_DATA} from "@angular/material/dialog";
import { Supplier } from "../../../../../common/tables/Supplier";
import { DialogData } from "../../../../../common/communication/dialog-data";
import { CommunicationService } from "src/app/services/communication.service";
import { PendingQueryComponent } from "../pending-query/pending-query.component";
import { MealPlan } from "../../../../../common/tables/MealPlan";


export const MEALPLANS_CATEGORIES: string[] = ["Vegetarien", "Carnivore", "Paleo","Keto"];

export const MEALPLANS_FROM_DB: MealPlan[] =  [{
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

export const SUPPLIERS_FROM_DB : Supplier[] = [{
  supplierNumber: 10,
  supplierName: "Einstein",
  supplierAddress: "10 rue de Wallace",
},
{
  supplierNumber: 17,
  supplierName: "Axelrod",
  supplierAddress: "91 rue de Pinlepas",
},
{
  supplierNumber: 77,
  supplierName: "Robert",
  supplierAddress: "354 avenue Illinois",
}
];


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

  planNumber: number;
  category: string;
  frequency: number;
  numberOfPeople: number;
  numberOfCalories: number;
  price: number;
  supplierNumber: number;

  suppliers: Supplier[];
  mealPlans: MealPlan[];
  categories:string[];

  pending: boolean = true;
  success: boolean = false;
  //have attributes for the errors


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
    this.getAllCategories();
  }

  openPendingDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "650px";
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  allFormFieldAreCompleted(): boolean{
    return (this.planNumber!==null)  
    && (this.category!==null)
    && (this.frequency!==null)
    && (this.numberOfPeople!==null)
    && (this.numberOfCalories !== null)
    && (this.price !== null)
    && (this.supplierNumber!==null);
  }

  addMealPlan(): void {
    
    
    this.data.mealPlanNumberAlreadyExist = false;
    for (const mealPlan of this.mealPlans) {
      if (mealPlan.planNumber === this.data.mealPlan.planNumber) {
        this.data.mealPlanNumberAlreadyExist = true;
        break;
      }
    }

    this.openPendingDialog();

    this.communicationService
      .insertMealPlan({
        planNumber: this.planNumber,
        category: this.category,
        frequency: this.frequency,
        numberOfPeople: this.numberOfPeople,
        numberOfCalories: this.numberOfCalories,
    price: this.price,
    supplierNumber: this.supplierNumber,
      } as MealPlan)

      setTimeout(() => {
        this.pending = false;
        this.openPendingDialog();
      }, 500);
      
  }

  getAllMealPlans(): void {
    this.mealPlans = MEALPLANS_FROM_DB ;
   // this.communicationService.getAllMealPlans().subscribe((mealPlans: MealPlan[]) => {
    //   this.mealPlans = mealPlans ? mealPlans : [];
    // });
 }

 getAllSuppliers(): void {
 this.suppliers = SUPPLIERS_FROM_DB; // comment this line and uncomment line 151- 155
   // this.communicationService
   //   .getAllSuppliers()
   //   .subscribe((suppliers: Supplier[]) => {
   //     this.suppliers = suppliers ? suppliers : [];
   //   });
 }

 getAllCategories(): void {
   this.categories = MEALPLANS_CATEGORIES;
   }

}
