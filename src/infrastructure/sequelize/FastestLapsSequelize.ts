import { Op } from 'sequelize';
import { IFastestLapsRepository } from '../../domain/repository/IFastestLapsRepository';
import { convertToCamelCase } from '../../utils/convertToCamel';
import { FastestLapInterface } from '../interface/FastestLapInterface';
import { FastestLapsModel } from '../model/FastestLapsModel';

export class FastestLapsSequelize implements IFastestLapsRepository {
  async createFastestLap(reqBody: any, seasonRaces: string): Promise<void> {
    if (!reqBody || !reqBody.length) return;
    await Promise.all(
      reqBody.map(async (item) => {
        const { grandPrix, driver, car, time } = convertToCamelCase(item);
        await FastestLapsModel.create({ carName: car, driverName: driver, grandPrix, time, seasonRaces });
      })
    );
    return;
  }

  async getListsByValueType(type: any, value: any): Promise<FastestLapInterface[]> {
    let races = [];
    switch (type) {
      case ':type' || null || undefined:
        races = await FastestLapsModel.findAll();
        break;
      case 'seasonRaces':
        races = await FastestLapsModel.findAll({ where: { seasonRaces: value } });
        break;
      case 'carName':
        races = await FastestLapsModel.findAll({ where: { carName: { [Op.like]: `${value}%` } } });
        break;
      case 'grandPrix':
        races = await FastestLapsModel.findAll({ where: { grandPrix: value } });
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
  private transformModelToEntity(model: FastestLapsModel): FastestLapInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
