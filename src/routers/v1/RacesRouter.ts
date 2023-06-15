import { Router } from 'express';
import { RacesUseCase } from '../../domain/usecase/RacesUseCase';
import { Racescontroller } from '../../controllers/Racescontroller';
import { IRacesRepository } from '../../domain/repository/IRacesRepository';
import { RacesSequelize } from '../../infrastructure/sequelize/RacesSequelize';

const BASE_ROUTE = '/races';

enum Routers {
  GET_LIST = '/get-lists/:type/:value'
}

export class RacesRouter {
  private racesRepository: IRacesRepository = new RacesSequelize();
  private racesUseCase: RacesUseCase = new RacesUseCase(this.racesRepository);
  private racescontroller: Racescontroller = new Racescontroller(this.racesUseCase);
  public routes(app: Router): void {
    app.get(BASE_ROUTE + Routers.GET_LIST, this.racescontroller.getListRaces);
  }
}
