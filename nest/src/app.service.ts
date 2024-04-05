import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): number {
    let count = 0;
    for (let i = 1; i <= 5000; i++) {
      for (let j = 1; j <= 5000; j++) {
        count += i + j;
      }
    }
    return count
  }
}
