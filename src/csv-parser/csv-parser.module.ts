import { DynamicModule, Module } from '@nestjs/common';
import { CsvParserService } from './csv-parser.service';
import { ConfigurableModuleClass } from './dynamic-csv-parser.definition';

// @Module({
//   providers: [
//     CsvParserService,
//     {
//       provide: 'CONFIG_OPTIONS',
//       useValue: {
//         allowedHeaders: ['id', 'name', 'email'],
//         validatorFn: (record: any) => {
//           return record.id && record.name && record.email;
//         },
//         transformerFn: (csvData: any) => {
//           return {
//             ...csvData,
//             name: csvData.name.trim(),
//             email: csvData.email.trim(),
//           };
//         },
//       },
//     },
//   ],
// })
// export class CsvParserModule {}
@Module({})
export class CsvParserModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: CsvParserModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        CsvParserService,
      ],
      exports: [CsvParserService],
    };
  }
}
@Module({
  providers: [CsvParserService],
  exports: [CsvParserService],
})
export class DynamicCsvParserModule extends ConfigurableModuleClass {}
