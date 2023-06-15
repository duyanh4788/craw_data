import { TeamsInterface } from '../../infrastructure/interface/TeamsInterface';

export interface ITeamsRepository {
  createTeam(reqBody: any, seasonRaces: string): Promise<void>;
  getListsByValueType(type: any, value: any): Promise<TeamsInterface[]>;
}
