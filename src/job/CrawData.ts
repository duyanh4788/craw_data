import { CrawDataUseCase } from '../domain/usecase/CrawDataUseCase';
import { logger } from '../services/loggerservice/Logger';
import { BaseJob } from './BaseJob';
import puppeteer from 'puppeteer';

export class CrawData extends BaseJob {
  JOB_INTERVAL: number = 240000 * 360; // 24h
  private crawDataUseCase: CrawDataUseCase = new CrawDataUseCase();
  constructor() {
    super();
  }

  async job(): Promise<any> {
    if (process.env.STATUS_CRAW_DATA !== 'OFF') {
      const t0 = performance.now();
      try {
        await this.crawDataUseCase.crawDataF1Results('job_crawdata');
      } catch (error) {
        logger.error('RemoveImagesFromAWSJob error', { error: error });
      }
      const t1 = performance.now();
      logger.info(`RemoveImagesFromAWSJob: Ending RemoveImagesFromAWSJob`, { time: t1 - t0 });
    }
  }
}
