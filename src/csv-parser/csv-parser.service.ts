import { Inject, Injectable } from '@nestjs/common';
type CsvParserConfigOptions = {
  allowedHeaders: string[];
  validatorFn: (record: any) => boolean;
  transformerFn: (record: any) => any;
};
@Injectable()
export class CsvParserService {
  // private readonly allowedHeaders: string[];
  // private readonly validatorFn: (record: string) => boolean;
  // private readonly transformerFn: (record: string) => any;
  // private readonly options: CsvParserConfigOptions;
  constructor(
    @Inject('CONFIG_OPTIONS')
    private readonly configOptions: CsvParserConfigOptions,
  ) {
    const { allowedHeaders, validatorFn, transformerFn } = configOptions;
  }

  private validateHeaders(headers: string[]): boolean {
    return (
      headers.length === this.configOptions.allowedHeaders.length &&
      headers.every(
        (item, idx) =>
          item.trim() === this.configOptions.allowedHeaders[idx].trim(),
      )
    );

    // return headers.every((header)=>this.configOptions.allowedHeaders.includes(header))
  }
  public parse(csvData: string): any[] {
    const lines = csvData.split('\n').filter((item) => item.trim().length > 0);
    const headers = lines
      .shift()
      .split(',')
      .map((item) => item.trim());
    const is_same = this.validateHeaders(headers);
    if (!is_same) {
      throw new Error('Invalid CSV headers');
    }
    return lines.map((line) => this.parseLine(line, headers));
  }

  private parseLine(line: string, headers: string[]): any {
    let record = {};
    const values = line.trim().split(',');
    if (values.length === headers.length) {
      headers.forEach((header, idx) => {
        record[header] = values[idx];
      });
      if (!this.configOptions.validatorFn(record)) {
        throw new Error('Validation failed');
      }
      return this.configOptions.transformerFn(record);
    }
  }
}
