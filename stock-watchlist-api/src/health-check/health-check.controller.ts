import { Request, Response, Router } from "express";
import { getDb } from "../data/db";

export class HealthCheckController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get("/", this.checkHealth);
  }

  private checkHealth = async (_req: Request, res: Response) => {
    const db = getDb();
    console.log(db.data.stocks.length);
    if (db.data?.alive) {
      res.status(200).json({ status: "Healthy", db: "alive" });
    } else {
      res.status(503).send("Service unavailable");
    }
  };
}
