import express from 'express';
import 'dotenv/config';
import cors from 'cors'; // <-- Add this import
import { HealthCheckController } from './health-check/health-check.controller';
import { initDb } from './data/db';
import { StocksController } from './stocks/stocks.controller';
import { IntervalDataSource } from './data/interval-data-source';
import { socketServer } from './websocket/socket-server';
import http from 'http';
import { WatchListsController } from './watchlists/watchlists.controller';

(async () => {
  await initDb();
  const app = express();
  app.use(cors()); // <-- Add this line
  app.use(express.json());

  app.get('/', (_req, res) => {
    res.send('Hello from TypeScript + ESM');
  });

  app.use('/api/health-check', new HealthCheckController().router);
  app.use('/api/stocks', new StocksController().router);
  app.use('/api/watchlists', new WatchListsController().router);
  const server = http.createServer(app);

  socketServer(server);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running ony port ${PORT}`);
    IntervalDataSource.getInstance().startInterval();
  });
})();
