import { IDriversRepository } from '../repository/IDriversRepository';

export class DriversUseCase {
  constructor(private driversRepository: IDriversRepository) {}

  async getListByValueType(type: any, value: any) {
    return await this.driversRepository.getListsByValueType(type, value);
  }
}
