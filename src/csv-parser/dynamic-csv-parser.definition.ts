import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface DynamicCsvParserModuleDefinition {
  allowedHeaders: string[];
  validatorFn: (record: any) => boolean;
  transformerFn: (record: any) => any;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DynamicCsvParserModuleDefinition>().build();
