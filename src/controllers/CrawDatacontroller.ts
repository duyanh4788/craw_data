import { Request, Response } from 'express';
import { SendRespone } from '../services/success/success';
import { RestError } from '../services/error/error';
import { CrawDataUseCase } from '../domain/usecase/CrawDataUseCase';

export class CrawDatacontroller {
  constructor(private crawDataUseCase: CrawDataUseCase) {}

  public crawDataF1Results = async (req: Request, res: Response) => {
    try {
      const ip: any = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      if (!ip) {
        throw new RestError('IP gateway not available!', 404);
      }
      const resultKey = await this.crawDataUseCase.crawDataF1Results(ip);
      if (resultKey.length) {
        this.crawDataUseCase.receivedResult(resultKey);
      }
      res.status(200).send({ message: 'system has load data, please waiting.' });
    } catch (error) {
      return RestError.manageServerError(res, error, false);
    }
  };
}
