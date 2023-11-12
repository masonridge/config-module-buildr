import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api-modules/api.module';
import { EnvProxyModule } from './env-proxy-module/env-proxy.module';
import { DynamicEnvProxyModule } from './dynamic-env-proxy-module/dynamic-env-proxy.module';
import {
  CsvParserModule,
  DynamicCsvParserModule,
} from './csv-parser/csv-parser.module';
import { JsonParserModule } from './json-parser/json-parser.module';

@Module({
  imports: [
    ApiModule,
    EnvProxyModule,
    JsonParserModule,
    DynamicEnvProxyModule.register({ exclude: ['DATA'] }),
    // CsvParserModule,
    // CsvParserModule.register({
    //   allowedHeaders: ['id', 'name', 'email'],
    //   validatorFn: (record: any) => {
    //     return record.id && record.name && record.email;
    //   },
    //   transformerFn: (csvData: any) => {
    //     return {
    //       ...csvData,
    //       name: csvData.name.trim(),
    //       email: csvData.email.trim(),
    //     };
    //   },
    // }),
    DynamicCsvParserModule.register({
      allowedHeaders: ['id', 'name', 'email'],
      validatorFn: (record: any) => {
        return record.id && record.name && record.email;
      },
      transformerFn: (csvData: any) => {
        return {
          ...csvData,
          name: csvData.name.trim(),
          email: csvData.email.trim(),
        };
      },
    }),
    JsonParserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
