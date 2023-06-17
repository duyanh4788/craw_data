import puppeteer from 'puppeteer';
import { redisController } from '../../redis/RedisController';
import { RestError } from '../../services/error/error';
import { RabbitMQSenderClient } from '../../rabitmq/pubsub/sender';
import axios from 'axios';
import { RabbitMQCRecivedlient } from '../../rabitmq/pubsub/receive';

export class CrawDataUseCase {
  rabbitMQSenderClient: RabbitMQSenderClient = new RabbitMQSenderClient();
  rabbitMQCRecivedlient: RabbitMQCRecivedlient = new RabbitMQCRecivedlient();
  constructor() {}

  public async crawDataF1Results(ip: any) {
    let getIp = await redisController.getRedis(ip);
    if (getIp && getIp.isCraw) {
      throw new RestError('you have get data from F1!', 404);
    }
    if (!getIp) {
      getIp = await redisController.setRedis({ keyValue: ip, value: { isCraw: true } });
    }
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.formula1.com/en/results.html');
    const dataYear = await page.evaluate(() => {
      const selectElement = document.querySelector('.resultsarchive-filter-form-select[name="year"]') as HTMLSelectElement;
      const options = Array.from(selectElement.options).map((option) => option.value);
      return options;
    });
    const yearSliceFive = dataYear.slice(0, 10); // get data in 10 years
    if (!yearSliceFive.length) {
      await browser.close();
      return;
    }
    let resultKey = [];
    let resultValue = [];
    for (const itemYear of yearSliceFive) {
      const dataTypes = await page.evaluate(() => {
        const selectElement = document.querySelector('.resultsarchive-filter-form-select[name="apiType"]') as HTMLSelectElement;
        const options = Array.from(selectElement.options).map((option) => option.value);
        return options;
      });
      await page.select('.resultsarchive-filter-form-select[name="year"]', itemYear);
      await page.waitForNavigation();
      for (const itemType of dataTypes) {
        await page.select('.resultsarchive-filter-form-select[name="apiType"]', itemType);
        await page.waitForNavigation();
        const tableData = await page.evaluate(() => {
          const table = document.querySelector('.resultsarchive-table') as HTMLTableElement;
          const headers = Array.from(table.querySelectorAll('th')).map((header) => header.textContent!.trim());
          const rows = Array.from(table.querySelectorAll('tr')).slice(1);
          const data = rows.map((row) => {
            const cells = Array.from(row.querySelectorAll('td')).map((cell) => {
              const cellValue = cell.textContent!.trim();
              if (cellValue.includes('\n')) {
                return cellValue.replace(/\n\s+/g, '');
              }
              return cellValue;
            });

            const rowData = cells.reduce((obj, value, index) => {
              const header = headers[index];
              if (header) {
                obj[header] = value;
              }
              return obj;
            }, {} as { [key: string]: string });

            return rowData;
          });

          return data;
        });
        resultKey.push({ key: `${itemYear}_${itemType}`, seasonRaces: itemYear });
        await redisController.setRedis({ keyValue: `${itemYear}_${itemType}`, value: tableData });
        resultValue.push({ key: `${itemYear}_${itemType}`, value: tableData });
      }
    }
    await browser.close();
    await this.produceResult(resultValue);
    return resultKey;
  }

  public async produceResult(resultValue: any[]) {
    for (let item of resultValue) {
      await this.rabbitMQSenderClient.produceMessages(item.key, item.value);
    }
  }

  public async receivedResult(keys: any[]) {
    for (const item of keys) {
      await this.rabbitMQCRecivedlient.consumeMessages(item.key, item.seasonRaces);
    }
  }
}
