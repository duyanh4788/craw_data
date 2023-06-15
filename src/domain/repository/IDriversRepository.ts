import { DriversInterface } from '../../infrastructure/interface/DriversInterface';

export interface IDriversRepository {
  createDriver(reqBody: any, seasonRaces: string): Promise<void>;
  getListsByValueType(type: any, value: any): Promise<DriversInterface[]>;
}
