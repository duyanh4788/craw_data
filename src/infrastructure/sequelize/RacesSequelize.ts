import { Op } from 'sequelize';
import { IRacesRepository } from '../../domain/repository/IRacesRepository';
import { convertToCamelCase } from '../../utils/convertToCamel';
import { RacesInterface } from '../interface/RacesInterface';
import { RacesModel } from '../model/RacesModel';

export class RacesSequelize implements IRacesRepository {
  async createRaces(reqBody: any, seasonRaces: string): Promise<void> {
    if (!reqBody || !reqBody.length) return;
    await Promise.all(
      reqBody.map(async (item) => {
        const { grandPrix, date, winner, car, laps, time } = convertToCamelCase(item);
        await RacesModel.create({ carName: car, date, grandPrix, laps, winner, time, seasonRaces });
      })
    );
    return;
  }

  async getListsByValueType(type: any, value: any): Promise<RacesInterface[]> {
    let races = [];
    switch (type) {
      case ':type' || null || undefined:
        races = await RacesModel.findAll();
        break;
      case 'seasonRaces':
        races = await RacesModel.findAll({ where: { seasonRaces: value } });
        break;
      case 'carName':
        races = await RacesModel.findAll({ where: { carName: { [Op.like]: `${value}%` } } });
        break;
      case 'grandPrix':
        races = await RacesModel.findAll({ where: { grandPrix: { [Op.like]: `${value}%` } } });
        break;
      case 'winner':
        races = await RacesModel.findAll({ where: { winner: { [Op.like]: `${value}%` } } });
        break;
      default:
        break;
    }
    return races.map((item) => this.transformModelToEntity(item));
  }

  /**
   * Transforms database model into domain entity
   * @param model
   */
  private transformModelToEntity(model: RacesModel): RacesInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
