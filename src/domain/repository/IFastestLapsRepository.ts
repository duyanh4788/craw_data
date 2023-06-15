import { FastestLapInterface } from '../../infrastructure/interface/FastestLapInterface';

export interface IFastestLapsRepository {
  createFastestLap(reqBody: any, seasonRaces: string): Promise<void>;
  getListsByValueType(type: any, value: any): Promise<FastestLapInterface[]>;
}
