import * as amqplib from 'amqplib';
import { logger } from '../../services/loggerservice/Logger';

export class RabbitMQSenderClient {
  private connection: amqplib.Connection;
  private channel: amqplib.Channel;

  public async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
    } catch (err) {
      logger.info(`RabbitMQ: connect`, err);
    }
  }

  public async postData(key: string, data: any): Promise<void> {
    try {
      await this.connect();
      await this.channel.assertExchange(key, 'fanout', { durable: false });
      this.channel.publish(key, '', Buffer.from(JSON.stringify(data)));
    } catch (err) {
      logger.info(`RabbitMQ: ${key}`, err);
    }
  }

  public async produceMessages(nameQueue: string, dataQueue: any): Promise<void> {
    try {
      await this.connect();
      await this.channel.assertQueue(nameQueue, { durable: true });
      this.channel.sendToQueue(nameQueue, Buffer.from(JSON.stringify(dataQueue)), {
        expiration: '10000',
        persistent: true
      });
    } catch (ex) {
      console.error(ex);
      return;
    }
  }
}
