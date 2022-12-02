import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { MealPlan } from '../../../common/tables/MealPlan';
import { Supplier } from '../../../common/tables/Supplier';

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // ======= MEAL PLANS ROUTES =======
    router.get("/mealPlans", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService.getAllMealPlans()
      .then((result: pg.QueryResult) => {
        const mealPlans: MealPlan[] = result.rows.map((mealPlan) => ({
          planNumber: mealPlan.numeroplan,
          category: mealPlan.categorie,
          frequency: mealPlan.frequence,
          numberOfPeople: mealPlan.nbpersonnes,
          numberOfCalories: mealPlan.nbcalories,
          price: mealPlan.prix,
          supplierNumber: mealPlan.numerofournisseur,
        } as MealPlan)); 
        res.json(mealPlans);
      })
      .catch((e: Error) => {
        res.json(-1);
        console.error(e.stack);
      });
    });

    router.post(
      "/mealPlans",
      (req: Request, res: Response, _: NextFunction) => {
        const mealPlan: MealPlan = {
          planNumber: Number(req.body.planNumber),
          category: req.body.category,
          frequency: Number(req.body.frequency),
          numberOfPeople: Number(req.body.numberOfPeople),
          numberOfCalories: Number(req.body.numberOfCalories),
          price: Number(req.body.price),
          supplierNumber: Number(req.body.supplierNumber),
        };
        this.databaseService
          .addMealPlan(mealPlan)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(e);
          });
      }
    );

    router.put(
      "/mealPlans",
      (req: Request, res: Response, _: NextFunction) => {
        const mealPlan: MealPlan = {
          planNumber: Number(req.body.planNumber),
          category: req.body.category,
          frequency: Number(req.body.frequency),
          numberOfPeople: Number(req.body.numberOfPeople),
          numberOfCalories: Number(req.body.numberOfCalories),
          price: Number(req.body.price),
          supplierNumber: Number(req.body.supplierNumber),
        };
        this.databaseService
          .updateMealPlan(mealPlan)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.delete(
      "/mealPlans/:planNumber",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .deletePlan(req.params.planNumber)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    // ======= SUPPLIERS ROUTES =======
    router.get("/suppliers", (req: Request, res: Response, _: NextFunction) => {
      this.databaseService.getAllSuppliers()
      .then((result: pg.QueryResult) => {
        const suppliers: Supplier[] = result.rows.map((supplier) => ({
          supplierNumber: supplier.numerofournisseur,
          supplierName: supplier.nomfournisseur,
          supplierAddress: supplier.adressefournisseur,
        } as Supplier)); 
        res.json(suppliers);
      })
      .catch((e: Error) => {
        res.json(-1);
        console.error(e.stack);
      });
    });
    return router;
  }
}
