export {};

declare global {
  namespace Express {
    interface Request {
      user?: any; // 👈️ turn off type checking
    }
  }

  var _pathFile: string;
  var _pathFileImgTest: string;
}