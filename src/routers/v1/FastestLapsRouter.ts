import { Router } from 'express';
import { FastestLapsSequelize } from '../../infrastructure/sequelize/FastestLapsSequelize';
import { IFastestLapsRepository } from '../../domain/repository/IFastestLapsRepository';
import { FastestLapsUseCase } from '../../domain/usecase/FastestLapsUseCase';
import { FastestLapscontroller } from '../../controllers/FastestLapscontroller';

const BASE_ROUTE = '/fastest-laps';

enum Routers {
  GET_LIST = '/get-lists/:type/:value'
}

export class FastestLapsRouter {
  private fastestLapsRepository: IFastestLapsRepository = new FastestLapsSequelize();
  private fastestLapsUseCase: FastestLapsUseCase = new FastestLapsUseCase(this.fastestLapsRepository);
  private fastestLapscontroller: FastestLapscontroller = new FastestLapscontroller(this.fastestLapsUseCase);
  public routes(app: Router): void {
    app.get(BASE_ROUTE + Routers.GET_LIST, this.fastestLapscontroller.getListFastestLap);
  }
}
