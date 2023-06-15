import { IFastestLapsRepository } from '../repository/IFastestLapsRepository';

export class FastestLapsUseCase {
  constructor(private fastestLapsRepository: IFastestLapsRepository) {}

  async getListByValueType(type: any, value: any) {
    return await this.fastestLapsRepository.getListsByValueType(type, value);
  }
}
