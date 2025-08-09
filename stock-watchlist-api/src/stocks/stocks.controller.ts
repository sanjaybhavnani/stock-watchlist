import { Request, Response, Router } from "express";
import { StocksService } from "./stocks.service";

export class StocksController {
    public router: Router;
    private stocksService: StocksService;
    constructor() {
        this.router = Router();
        this.stocksService = StocksService.getInstance();
        this.routes();
    }

    private routes() {
        this.router.get('/', this.getStocks);
    }

    private getStocks = async(_req: Request, res: Response) => {
        // Logic to fetch stocks from the database
        const searchString = _req.query.search as string || '';
        const stocks = await this.stocksService.getStocks(searchString);
        res.status(200).json(stocks);
    }
}