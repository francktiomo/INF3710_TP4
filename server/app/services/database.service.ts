import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { MealPlan } from "../../../common/tables/MealPlan";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4_Livraison",
    password: "root",
    port: 5432,        // Warning: can also be 5433 for some users
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  // ======= MEAL PLANS =======
  async getAllMealPlans(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = 'SELECT * FROM ToutFrais.planrepas';
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async addMealPlan(mealPlan: MealPlan): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const values: (number | string)[] = [
      mealPlan.planNumber,
      mealPlan.category,
      mealPlan.frequency,
      mealPlan.numberOfPeople,
      mealPlan.numberOfCalories,
      mealPlan.price,
      mealPlan.supplierNumber
    ];
    const queryText = `
      INSERT INTO
        ToutFrais.Planrepas (numeroplan, categorie, frequence, nbpersonnes, nbcalories, prix, numerofournisseur)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7);
    `;
    const res = await client.query(queryText, values);
    client.release();
    return res;  
  }

  async updateMealPlan(mealPlan: MealPlan): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const values: (number | string)[] = [
      mealPlan.planNumber,
      mealPlan.category,
      mealPlan.frequency,
      mealPlan.numberOfPeople,
      mealPlan.numberOfCalories,
      mealPlan.price,
      mealPlan.supplierNumber
    ];
    const queryText = `
      UPDATE ToutFrais.PlanrepaS
      SET numeroplan = $1,
          categorie = $2,
          frequence =  $3,
          nbpersonnes =  $4,
          nbcalories =  $5,
          prix =  $6,
          numerofournisseur =  $7
      WHERE numeroplan = $1;
    `;
    const res = await client.query(queryText, values);
    client.release();
    return res;  
  }


  async deletePlan(planNumber: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `DELETE FROM ToutFrais.Planrepas WHERE numeroplan = ${Number(planNumber)};`;
    const res = await client.query(queryText);
    client.release()
    return res;
  }

  // SUPPLIERS
  async getAllSuppliers(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = 'SELECT * FROM ToutFrais.Fournisseur';
    const res = await client.query(queryText);
    client.release();
    return res;
  }

}