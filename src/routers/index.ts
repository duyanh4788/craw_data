import { Router } from 'express';
import { RacesRouter } from './v1/RacesRouter';
import { DriversRouter } from './v1/DriversRouter';
import { TeamsRouter } from './v1/TeamsRouter';
import { FastestLapsRouter } from './v1/FastestLapsRouter';
import { CrawData } from '../job/CrawData';
import { CrawDataRouter } from './v1/CrawDataRouter';

export class Routers {
  public racesRouter: RacesRouter = new RacesRouter();
  public driversRouter: DriversRouter = new DriversRouter();
  public teamsRouter: TeamsRouter = new TeamsRouter();
  public fastestLapsRouter: FastestLapsRouter = new FastestLapsRouter();
  public crawDataRouter: CrawDataRouter = new CrawDataRouter();

  public routes(app: Router): Router {
    this.racesRouter.routes(app);
    this.driversRouter.routes(app);
    this.teamsRouter.routes(app);
    this.fastestLapsRouter.routes(app);
    this.crawDataRouter.routes(app);
    return Router();
  }
}
