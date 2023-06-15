import { Router } from 'express';
import { TeamsSequelize } from '../../infrastructure/sequelize/TeamsSequelize';
import { ITeamsRepository } from '../../domain/repository/ITeamsRepository';
import { TeamsUseCase } from '../../domain/usecase/TeamsUseCase';
import { Teamscontroller } from '../../controllers/Teamscontroller';

const BASE_ROUTE = '/teams';

enum Routers {
  GET_LIST = '/get-lists/:type/:value'
}

export class TeamsRouter {
  private teamsRepository: ITeamsRepository = new TeamsSequelize();
  private teamsUseCase: TeamsUseCase = new TeamsUseCase(this.teamsRepository);
  private teamscontroller: Teamscontroller = new Teamscontroller(this.teamsUseCase);
  public routes(app: Router): void {
    app.get(BASE_ROUTE + Routers.GET_LIST, this.teamscontroller.getListTeams);
  }
}
