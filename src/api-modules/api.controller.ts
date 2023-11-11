import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }
  @Get('dynamic')
  getDynamic(): string {
    return this.apiService.getDynamicData();
  }
}
