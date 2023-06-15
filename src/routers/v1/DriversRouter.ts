import { Router } from 'express';
import { DriversSequelize } from '../../infrastructure/sequelize/DriversSequelize';
import { IDriversRepository } from '../../domain/repository/IDriversRepository';
import { DriversUseCase } from '../../domain/usecase/DriversUseCase';
import { Driverscontroller } from '../../controllers/Driverscontroller';

const BASE_ROUTE = '/drivers';

enum Routers {
  GET_LIST = '/get-lists/:type/:value'
}

export class DriversRouter {
  private driversRepository: IDriversRepository = new DriversSequelize();
  private driversUseCase: DriversUseCase = new DriversUseCase(this.driversRepository);
  private driverscontroller: Driverscontroller = new Driverscontroller(this.driversUseCase);
  public routes(app: Router): void {
    app.get(BASE_ROUTE + Routers.GET_LIST, this.driverscontroller.getListDrivers);
  }
}
