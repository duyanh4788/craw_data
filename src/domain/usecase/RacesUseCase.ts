import { IRacesRepository } from '../repository/IRacesRepository';

export class RacesUseCase {
  constructor(private raceRepository: IRacesRepository) {}

  async getListByValueType(type: any, value: any) {
    return await this.raceRepository.getListsByValueType(type, value);
  }
}
