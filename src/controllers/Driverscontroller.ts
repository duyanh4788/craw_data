import { Request, Response } from 'express';
import { DriversUseCase } from '../domain/usecase/DriversUseCase';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';

export class Driverscontroller {
  constructor(private driversUseCase: DriversUseCase) {}

  public getListDrivers = async (req: Request, res: Response) => {
    try {
      const { type, value } = req.params;

      const lists = await this.driversUseCase.getListByValueType(type, value);
      return new SendRespone({ data: lists }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
