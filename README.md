# ConfigurableModulebuilder

Code is from https://medium.com/geekculture/how-to-use-configurable-module-builders-in-nest-js-v9-ae1f458fd6ca

Source code: https://github.com/agustinustheo/configurable-module-builder-example/tree/step-4-async

## CSVParser

### service

```ts
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CsvParserService {
  private readonly allowedHeaders: string[];
  private readonly validatorFn: (record: any) => boolean;
  private readonly transformerFn: (record: any) => any;

  constructor(@Inject('CONFIG_OPTIONS') private options: Record<string, any>) {
    const { allowedHeaders, validatorFn, transformerFn } = options;
    this.allowedHeaders = allowedHeaders;
    this.validatorFn = validatorFn;
    this.transformerFn = transformerFn;
  }

  // A method to parse CSV data
  public parse(csvData: string): any[] {
    // Split the CSV data into an array of lines
    const lines = csvData.split('\n');
    // Extract the headers
    const headers = lines.shift().split(',');
    // Check if headers are allowed
    if (!this.validateHeaders(headers)) {
      throw new Error('Invalid CSV headers.');
    }
    // Parse the remaining lines
    return lines.map((line) => this.parseLine(line, headers));
  }

  private validateHeaders(headers: string[]): boolean {
    // Here we check if the headers are all allowed
    return headers.every((header) => this.allowedHeaders.includes(header));
  }

  private parseLine(line: string, headers: string[]): any {
    const record = {};
    const values = line.split(',');

    // Map the values to an object with headers as keys
    headers.forEach((header, index) => {
      record[header] = values[index];
    });

    // Validate the record using the provided validation function
    if (!this.validatorFn(record)) {
      throw new Error('Validation failed for record.');
    }

    // Transform the record using the provided transformation function
    return this.transformerFn(record);
  }
}
```
