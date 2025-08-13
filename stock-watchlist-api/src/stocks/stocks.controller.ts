import { Request, Response, Router } from 'express';
import { StocksService } from './stocks.service';

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
    this.router.get('/:symbol', this.getStockBySymbol);
  }

  private getStocks = async (req: Request, res: Response) => {
    const searchString = (req.query.search as string) || '';
    const stocks = await this.stocksService.getStocks(searchString);
    res.status(200).json(stocks);
  };

  private getStockBySymbol = async (req: Request, res: Response) => {
    const symbol = req.params.symbol;
    const stock = await this.stocksService.getStock(symbol);
    if (!stock) {
      res.status(404).send({ message: 'Stock not found' });
      return;
    }
    res.status(200).json(stock);
  };
}
