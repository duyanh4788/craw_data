import { RacesInterface } from '../../infrastructure/interface/RacesInterface';

export interface IRacesRepository {
  createRaces(reqBody: any, seasonRaces: string): Promise<void>;
  getListsByValueType(type: any, value: any): Promise<RacesInterface[]>;
}
