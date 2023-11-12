import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api-modules/api.module';
import { EnvProxyModule } from './env-proxy-module/env-proxy.module';
import { DynamicEnvProxyModule } from './dynamic-env-proxy-module/dynamic-env-proxy.module';
import { CsvParserModule } from './csv-parser/csv-parser.module';

@Module({
  imports: [
    ApiModule,
    EnvProxyModule,
    DynamicEnvProxyModule.register({ exclude: ['DATA'] }),
    CsvParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
