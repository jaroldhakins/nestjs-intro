import { LoggerService } from './logger/logger.service';
import { DummyService } from './dummy/dummy.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly dummyService: DummyService,
    private readonly loggerService: LoggerService,
  ) {}

  getHello(): string {
    return `Hello World! ${this.loggerService.log(this.dummyService.work())}`;
  }
}
