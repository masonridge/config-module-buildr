import { Module } from '@nestjs/common';
import { CsvParserService } from './csv-parser.service';

@Module({
  providers: [
    CsvParserService,
    {
      provide: 'CONFIG_OPTIONS',
      useValue: {
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
      },
    },
  ],
})
export class CsvParserModule {}
