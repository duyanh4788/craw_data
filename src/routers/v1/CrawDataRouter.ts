import { Router } from 'express';
import { CrawDatacontroller } from '../../controllers/CrawDatacontroller';
import { CrawDataUseCase } from '../../domain/usecase/CrawDataUseCase';

const BASE_ROUTE = '/craws';

enum Routers {
  CRAW_DATA_F1_RESULT = '/craw-data-f1-result'
}
export class CrawDataRouter {
  private crawDataUseCase: CrawDataUseCase = new CrawDataUseCase();
  private crawDataController: CrawDatacontroller = new CrawDatacontroller(this.crawDataUseCase);
  public routes(app: Router): void {
    app.get(BASE_ROUTE + Routers.CRAW_DATA_F1_RESULT, this.crawDataController.crawDataF1Results);
  }
}
