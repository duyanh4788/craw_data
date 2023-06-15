import { Op } from 'sequelize';
import { IDriversRepository } from '../../domain/repository/IDriversRepository';
import { convertToCamelCase } from '../../utils/convertToCamel';
import { DriversInterface } from '../interface/DriversInterface';
import { DriversModel } from '../model/DriversModel';

export class DriversSequelize implements IDriversRepository {
  async createDriver(reqBody: any, seasonRaces: string): Promise<void> {
    if (!reqBody || !reqBody.length) return;
    await Promise.all(
      reqBody.map(async (item) => {
        const { pos, driver, nationality, car, pTS } = convertToCamelCase(item);
        await DriversModel.create({ carName: car, driverName: driver, nationality, pos, pts: pTS.toLowerCase(), seasonRaces });
      })
    );
    return;
  }

  async getListsByValueType(type: any, value: any): Promise<DriversInterface[]> {
    let races = [];
    switch (type) {
      case ':type' || null || undefined:
        races = await DriversModel.findAll();
        break;
      case 'seasonRaces':
        races = await DriversModel.findAll({ where: { seasonRaces: value } });
        break;
      case 'carName':
        races = await DriversModel.findAll({ where: { carName: { [Op.like]: `${value}%` } } });
        break;
      case 'driverName':
        races = await DriversModel.findAll({ where: { driverName: { [Op.like]: `${value}%` } } });
        break;
      case 'nationality':
        races = await DriversModel.findAll({ where: { nationality: value.toUpperCase() } });
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
  private transformModelToEntity(model: DriversModel): DriversInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
