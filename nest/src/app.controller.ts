import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getCalculate(): string {
    let count = 0;
    for (let i = 1; i <= 5000; i++) {
      for (let j = 1; j <= 5000; j++) {
        count += i + j;
      }
    }
    return count + ""
  }

  @Get('worker')
  async calculateWithWorker(): Promise<number> {
    return await this.appService.calculateWithWorker()
  }
}
