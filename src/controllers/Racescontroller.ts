import { Request, Response } from 'express';
import { RacesUseCase } from '../domain/usecase/RacesUseCase';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';

export class Racescontroller {
  constructor(private racesUseCase: RacesUseCase) {}

  public getListRaces = async (req: Request, res: Response) => {
    try {
      const { type, value } = req.params;

      const lists = await this.racesUseCase.getListByValueType(type, value);
      return new SendRespone({ data: lists }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
