import { Request, Response } from 'express';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { TeamsUseCase } from '../domain/usecase/TeamsUseCase';

export class Teamscontroller {
  constructor(private teamsUseCase: TeamsUseCase) {}

  public getListTeams = async (req: Request, res: Response) => {
    try {
      const { type, value } = req.params;
      const lists = await this.teamsUseCase.getListByValueType(type, value);
      return new SendRespone({ data: lists }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
