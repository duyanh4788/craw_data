import { Request, Response } from 'express';
import { RestError } from '../services/error/error';
import { SendRespone } from '../services/success/success';
import { FastestLapsUseCase } from '../domain/usecase/FastestLapsUseCase';

export class FastestLapscontroller {
  constructor(private fastestLapsUseCase: FastestLapsUseCase) {}

  public getListFastestLap = async (req: Request, res: Response) => {
    try {
      const { type, value } = req.params;
      const lists = await this.fastestLapsUseCase.getListByValueType(type, value);
      return new SendRespone({ data: lists }).send(res);
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
