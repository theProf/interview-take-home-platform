import { appendFile } from "node:fs/promises";
import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logPath = "./custom.log";

  use(_req: any, _res: any, next: () => void) {
    this.log("Request...", _req.body);
    next();
  }

  // TODO: use a logger like winston and Factory if we want more fine-grain file logging
  private log(...args: any[]) {
    appendFile(this.logPath, JSON.stringify(args));
  }
}
