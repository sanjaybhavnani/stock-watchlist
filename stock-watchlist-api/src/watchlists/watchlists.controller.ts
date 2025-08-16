import { Request, Response, Router } from 'express';
import { WatchlistsService } from './watchlists.service';
import { CustomError } from '../models/custom-error';

export class WatchListsController {
  public router: Router;
  private watchlistsService: WatchlistsService;

  constructor() {
    this.router = Router();
    this.watchlistsService = WatchlistsService.getInstance();
    this.router.get('/', this.getWatchlists);
    this.router.get('/:id', this.getWatchlistById);
    this.router.post('/', this.createWatchList);
    this.router.put('/:id', this.updateWatchlist);
    this.router.delete('/:id', this.deleteWatchlist);
  }

  private getWatchlists = async (req: Request, res: Response) => {
    const watchlists = await this.watchlistsService.getWatchlists();
    const sortedWatchlists = watchlists?.sort((a, b) => a.name.localeCompare(b.name)) || [];
    res.status(200).json(sortedWatchlists);
  };

  private createWatchList = async (req: Request, res: Response) => {
    try {
      const result = await this.watchlistsService.createWatchList(req.body);
      res.status(201).json(result);
    } catch (err) {
      this.handleError(err as CustomError, res);
    }
  };

  private updateWatchlist = async (req: Request, res: Response) => {
    try {
      const watchlist = await this.watchlistsService.updateWatchlist(req.body);
      res.status(200).json(watchlist);
    } catch (err) {
      this.handleError(err as CustomError, res);
    }
  };

  private deleteWatchlist = async (req: Request, res: Response) => {
    try {
      await this.watchlistsService.deleteWatchlist(req.params.id);
      res.status(200).send();
    } catch (err) {
      this.handleError(err as CustomError, res);
    }
  };

  private handleError(customError: CustomError, res: Response) {
    res.status(customError?.code || 500).json({
      code: customError?.code,
      message: customError?.message || 'Internal server error.',
    });
  }

  private getWatchlistById = async (req: Request, res: Response) => {
    try {
      const watchlist = await this.watchlistsService.getWatchlistById(
        req.params.id
      );
      res.status(200).json(watchlist);
    } catch (err) {
      this.handleError(err as CustomError, res);
    }
  };
}
