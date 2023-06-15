import { logger } from '../services/loggerservice/Logger';
import { BaseJob } from './BaseJob';
import puppeteer from 'puppeteer';

export class CrawData extends BaseJob {
  JOB_INTERVAL: number = 240000 * 360; // 24h

  constructor() {
    super();
  }

  async job(): Promise<any> {
    if (process.env.STATUS_CRAW_DATA !== 'OFF') {
      const t0 = performance.now();
      try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://www.formula1.com/en/results.html');

        const dataYear = await page.evaluate(() => {
          const selectElement = document.querySelector('.resultsarchive-filter-form-select[name="year"]') as HTMLSelectElement;
          const options = Array.from(selectElement.options).map((option) => option.value);

          return options;
        });

        const yearSliceFive = dataYear.slice(0, 5);

        if (!yearSliceFive.length) {
          await browser.close();
          return;
        }

        const dataValue = await Promise.all(
          yearSliceFive.map(async (itemYear) => {
            await page.select('.resultsarchive-filter-form-select[name="year"]', itemYear);
            await page.waitForNavigation();

            const dataType = await page.evaluate(() => {
              const selectElement = document.querySelector('.resultsarchive-filter-form-select[name="apiType"]') as HTMLSelectElement;
              const options = Array.from(selectElement.options).map((option) => option.value);
              return options;
            });
            const dataValue = await Promise.all(
              dataType.map(async (itemType) => {
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
                      obj[headers[index]] = value;
                      return obj;
                    }, {} as { [key: string]: string });

                    delete rowData[''];

                    return rowData;
                  });
                  return data;
                });
                return { keyYear: itemYear, keyType: itemType, [itemType]: tableData };
              })
            );
            return dataValue;
          })
        );
        console.log(dataValue);
        await browser.close();
      } catch (error) {
        logger.error('RemoveImagesFromAWSJob error', { error: error });
      }
      const t1 = performance.now();
      logger.info(`RemoveImagesFromAWSJob: Ending RemoveImagesFromAWSJob`, { time: t1 - t0 });
    }
  }
}
