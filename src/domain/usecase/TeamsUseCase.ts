import { ITeamsRepository } from '../repository/ITeamsRepository';

export class TeamsUseCase {
  constructor(private teamsRepository: ITeamsRepository) {}

  async getListByValueType(type: any, value: any) {
    return await this.teamsRepository.getListsByValueType(type, value);
  }
}
