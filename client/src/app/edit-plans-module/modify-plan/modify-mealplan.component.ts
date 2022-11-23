import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../../common/communication/dialog-data";
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from "moment";
import { CommunicationService } from "../../services/communication.service";
import { Variete } from "../../../../../common/tables/Variete";
import { Semencier } from "../../../../../common/tables/Semencier";
import { AdaptationTypeSolVariete } from '../../../../../common/tables/AdaptationTypeSolVariete';
import { PendingQueryComponent } from "../pending-query/pending-query.component";
import { Production } from '../../../../../common/tables/Production';



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


  date = new FormControl(moment());
  nomVariete: string = '';
  miseEnPlaceStart: Date;
  miseEnPlaceEnd: Date;
  periodeRecolteStart: Date;
  periodeRecolteEnd: Date;
  anneeMiseEnMarche: string = '';
  plantation: string = '';
  entretien: string = '';
  recolte: string = '';
  commentaire: string = '';
  bio: boolean = false;
  nomSemencier: string = '';
  adaptation: string = '';
  varietes: Variete[];
  semenciers: Semencier[];
  adaptations: AdaptationTypeSolVariete[];
  productions: Production[];


  placeholderMP: boolean = false;
  placeholderPR: boolean = false;
  placeholderMEP: boolean = false;
  pending: boolean = true;
  success: boolean = false;
  prodModError: boolean = false;
  adaptModError: boolean = false;
  private deepSaveNomVariete: string = '';
  private deepSaveAdaptationTypeSol: string = '';
  private deepSaveNomSemencier: string = '';

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<ModifyMealPlanComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly communicationService: CommunicationService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],

    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required],
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required],
    });
    this.sixthFormGroup = this._formBuilder.group({
      sixthCtrl: ['', Validators.required],
    });
    this.sixthFormGroup = this._formBuilder.group({
      seventhCtrl: ['', Validators.required],
    });
    
    this.getAllVarietes();
    this.getAllSemencier();
    this.getAllAdaptationTypeSolVariete();
    setTimeout(() => { this.loadValues() }, 250);
  }

  loadValues(): void {
    if (!this.data || !this.data.variete) return;
    for (const variete of this.varietes) {
      if (variete.nom === this.data.variete.nom) {
        this.nomVariete = this.data.variete.nom;
        this.deepSaveNomVariete = this.data.variete.nom;
        this.commentaire = this.data.variete.commentairegeneral;
        const descriptions: string[] = this.data.variete.description.replace('("', '').replace('")', '').split('","');
        this.plantation = descriptions[0].split('""').join('');
        this.entretien = descriptions[1].split('""').join('');
        this.recolte = descriptions[2].split('""').join('');

        if (!this.date || !this.date.value) return;
        const ctrlValue = this.date.value;
        ctrlValue.day(new Date('1').toString());
        ctrlValue.month(new Date('1').toString());
        ctrlValue.year(Number(this.anneeMiseEnMarche));
        this.date.setValue(ctrlValue);
        break;
      }
    }
    for (const production of this.productions) {
      if (production.nomvariete === this.data.variete.nom) {
        this.bio = production.produitbio;
        this.nomSemencier = production.nomsemencier;
        this.deepSaveNomSemencier = production.nomsemencier;
      }
    }
    for (const adaptation of this.adaptations) {
      if (adaptation.nomvariete === this.data.variete.nom) {
        this.adaptation = adaptation.adaptationtypesol;
        this.deepSaveAdaptationTypeSol = adaptation.adaptationtypesol;
        break;
      }
    }
    this.placeholderMP = true;
    this.placeholderPR = true;
    this.placeholderMEP = false;
  }


  getSetOfNomsSemenciers(): Set<string> | undefined {
    if (!this.productions) return;
    const setOfNomsSemenciers: Set<string> = new Set<string>();
    this.productions.forEach((production: Production) => setOfNomsSemenciers.add(production.nomsemencier));
    return setOfNomsSemenciers;
  }

  async openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      update: true,
      prodModError: this.prodModError,
      adaptModError: this.adaptModError
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  modifyVariete(): void {
    this.openDialog();
    const sep = "##//##";
    this.communicationService.updateVariete({
      nom: this.nomVariete,
      anneemiseenmarche: new Date(this.anneeMiseEnMarche),
      description: this.plantation + sep +  this.entretien + sep + this.recolte,
      periodemiseenplace: this.convertToDate(this.miseEnPlaceStart.toString()) + ' au ' +  this.convertToDate(this.miseEnPlaceEnd.toString()),
      perioderecolte: this.convertToDate(this.periodeRecolteStart.toString()) + ' au ' +  this.convertToDate(this.periodeRecolteEnd.toString()),
      commentairegeneral: this.commentaire,
      oldvarietename: this.deepSaveNomVariete
    } as Variete).subscribe(async (resModVar: number) => {
      if (resModVar !== -1) {
        let isPresent: boolean = false;
        for (const adaptation of this.adaptations) {
          if (adaptation.adaptationtypesol === this.deepSaveAdaptationTypeSol) {
            isPresent = true;
            break;
          }
        }
        console.log(!isPresent);
        if (!isPresent) {
          this.communicationService.insertAdaptation({
            adaptationtypesol: this.adaptation,
            nomvariete: this.nomVariete,
          } as AdaptationTypeSolVariete).subscribe((_: number) => {});
          await new Promise(_ => setTimeout(_, 250));
          this.loadValues();
          console.log('working');
        }
        console.log('working2');
        isPresent = false;
        this.communicationService.modifyAdaptation({
          adaptationtypesol: this.adaptation,
          nomvariete: this.nomVariete,
          oldadaptationtypesol: this.deepSaveAdaptationTypeSol,
          oldnomvariete: this.deepSaveNomVariete,
        } as AdaptationTypeSolVariete).subscribe(async (resModAdapt: number) => {
          if (resModAdapt !== -1) {
            for (const production of this.productions) {
              if (production.nomsemencier === this.deepSaveNomSemencier) {
                isPresent = true;
                break;
              }
            }
            if (!isPresent) {
              this.communicationService.insertProduction({
                nomvariete: this.nomVariete,
                nomsemencier: this.nomSemencier,
                produitbio: this.bio,
              } as Production).subscribe((_: number) => {});
              await new Promise(_ => setTimeout(_, 250));
              this.loadValues();
            }
            this.communicationService.modifyProduction({
              nomvariete: this.nomVariete,
              nomsemencier: this.nomSemencier,
              produitbio: this.bio,
              oldnomvariete: this.deepSaveNomVariete,
              oldnomsemencier: this.deepSaveNomSemencier,
            } as Production).subscribe((resModProd: number) => {
              if (resModProd !== -1) {
                this.success = true;
              } else {
                this.prodModError = true;
              }
            });
          } else {
            this.adaptModError = true;
          }
        })
      }
      setTimeout(() => {
        this.pending = false;
        this.openDialog();
      }, 1000);
    });
  }

  setYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>): void {
    datepicker.close();
    if (!this.date || !this.date.value) return;
    const ctrlValue = this.date.value;
    ctrlValue.day(new Date('1').toString());
    ctrlValue.month(new Date('1').toString());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.anneeMiseEnMarche = normalizedMonthAndYear.year().toString();
  }

  convertToDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.getDate().toString() + '/' + date.getMonth().toString() + '/' + date.getFullYear().toString();
  }

  convertToDatePrint(dateStr: string): string {
    const date = new Date(dateStr);
    return date.getDate().toString() + '/' + (date.getMonth() + 1).toString() + '/' + date.getFullYear().toString();
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

  resetAnneeMiseMarche(): void {
    this.anneeMiseEnMarche = '';
  }

  printBio(): string {
    return this.bio ? "oui" : "non";
  }

  private getAllVarietes(): void {
    this.communicationService.getAllVarietes().subscribe((varietes: Variete[]) => {
      this.varietes = varietes ? varietes : [];
    });
  }

  private getAllSemencier(): void {
    this.communicationService.getAllSemencier().subscribe((semenciers: Semencier[]) => {
      this.semenciers = semenciers ? semenciers : [];
    });
  }

  private getAllAdaptationTypeSolVariete(): void {
    this.communicationService.getAllAdaptationTypeSolVariete().subscribe((adaptations: AdaptationTypeSolVariete[]) => {
      this.adaptations = adaptations ? adaptations : [];
    });
  }

}
