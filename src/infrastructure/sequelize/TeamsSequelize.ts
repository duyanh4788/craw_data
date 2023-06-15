import { Op } from 'sequelize';
import { ITeamsRepository } from '../../domain/repository/ITeamsRepository';
import { convertToCamelCase } from '../../utils/convertToCamel';
import { TeamsInterface } from '../interface/TeamsInterface';
import { TeamsModel } from '../model/TeamsModel';

export class TeamsSequelize implements ITeamsRepository {
  async createTeam(reqBody: any, seasonRaces: string): Promise<void> {
    if (!reqBody || !reqBody.length) return;
    await Promise.all(
      reqBody.map(async (item) => {
        const { pos, team, pTS } = convertToCamelCase(item);
        await TeamsModel.create({ pos, teamName: team, pts: pTS.toLowerCase(), seasonRaces });
      })
    );
    return;
  }

  async getListsByValueType(type: any, value: any): Promise<TeamsInterface[]> {
    let races = [];
    switch (type) {
      case ':type' || null || undefined:
        races = await TeamsModel.findAll();
        break;
      case 'seasonRaces':
        races = await TeamsModel.findAll({ where: { seasonRaces: value } });
        break;
      case 'teamName':
        races = await TeamsModel.findAll({ where: { teamName: { [Op.like]: `${value}%` } } });
        break;
      case 'pts':
        races = await TeamsModel.findAll({ where: { pts: value } });
        break;
      case 'pos':
        races = await TeamsModel.findAll({ where: { pos: value } });
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
  private transformModelToEntity(model: TeamsModel): TeamsInterface {
    if (!model) return;
    const entity: any = {};
    const keysObj = Object.keys(model.dataValues);
    for (let key of keysObj) {
      entity[key] = model[key];
    }
    return entity;
  }
}
