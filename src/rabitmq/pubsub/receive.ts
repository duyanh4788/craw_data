import * as amqplib from 'amqplib';
import { logger } from '../../services/loggerservice/Logger';
import { IRacesRepository } from '../../domain/repository/IRacesRepository';
import { RacesSequelize } from '../../infrastructure/sequelize/RacesSequelize';
import { TeamsSequelize } from '../../infrastructure/sequelize/TeamsSequelize';
import { DriversSequelize } from '../../infrastructure/sequelize/DriversSequelize';
import { FastestLapsSequelize } from '../../infrastructure/sequelize/FastestLapsSequelize';
import { ITeamsRepository } from '../../domain/repository/ITeamsRepository';
import { IDriversRepository } from '../../domain/repository/IDriversRepository';
import { IFastestLapsRepository } from '../../domain/repository/IFastestLapsRepository';
import { TypeModel } from '../../common/common.enum';

export class RabbitMQCRecivedlient {
  private connection: amqplib.Connection;
  private channel: amqplib.Channel;
  private racesRepository: IRacesRepository = new RacesSequelize();
  private teamsRepository: ITeamsRepository = new TeamsSequelize();
  private driversRepository: IDriversRepository = new DriversSequelize();
  private fastestLapsRepository: IFastestLapsRepository = new FastestLapsSequelize();

  public async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
    } catch (err) {
      logger.info(`RabbitMQ: connect`, err);
    }
  }

  public async receiveData(key: any): Promise<void> {
    try {
      await this.connect();
      await this.channel.assertExchange(key, 'fanout', { durable: false });
      const { queue } = await this.channel.assertQueue('', { exclusive: true });
      await this.channel.bindQueue(queue, key, '');
      await this.channel.consume(queue, (msg) => {
        switch (key.split('_')[1]) {
          case '':
            break;

          default:
            break;
        }
      });
    } catch (err) {
      logger.info(`RabbitMQ: ${key}`, err);
      return;
    }
  }

  public async consumeMessages(nameQueue: string, seasonRaces: string): Promise<void> {
    try {
      await this.connect();
      await this.channel.assertQueue(nameQueue, { durable: true });
      this.channel.prefetch(5);
      await this.channel.consume(
        nameQueue,
        async (msg) => {
          if (nameQueue.split('_')[1] === TypeModel.RACES) {
            await this.racesRepository.createRaces(JSON.parse(msg.content as any), seasonRaces);
          }
          if (nameQueue.split('_')[1] === TypeModel.DRIVERS) {
            await this.driversRepository.createDriver(JSON.parse(msg.content as any), seasonRaces);
          }
          if (nameQueue.split('_')[1] === TypeModel.TEAM) {
            await this.teamsRepository.createTeam(JSON.parse(msg.content as any), seasonRaces);
          }
          if (nameQueue.split('_')[1] === TypeModel.FASTEST_LAP) {
            await this.fastestLapsRepository.createFastestLap(JSON.parse(msg.content as any), seasonRaces);
          }
        },
        { noAck: true }
      );
    } catch (err) {
      console.error(err);
      return;
    }
  }
}
