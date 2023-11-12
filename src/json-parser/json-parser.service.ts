import { Inject, Injectable } from '@nestjs/common';
import Ajv, { JSONSchemaType } from 'ajv';

type JsonParserConfigOptions = {
  schema: JSONSchemaType<any>;
  transformerFn: <T>(record: T) => any;
};

@Injectable()
export class JsonParserService {
  constructor(
    @Inject('JSON_CONFIG_OPTIONS')
    private readonly configOptions: JsonParserConfigOptions,
  ) {
    const { schema, transformerFn } = configOptions;
  }
  private validateSchema(jsonData: any): boolean {
    const ajv = new Ajv();
    const validate = ajv.compile(this.configOptions.schema);
    if (!validate(jsonData)) {
      throw new Error(
        `Validation failed for the Json data: ${ajv.errorsText(
          validate.errors,
        )}`,
      );
    }
    return true;

    // return headers.every((header)=>this.configOptions.allowedHeaders.includes(header))
  }
  public parse(jsonData: string): any {
    //parse the json data
    console.log(jsonData);

    const data = JSON.parse(jsonData);
    // validate data against schema
    this.validateSchema(data);
    return this.configOptions.transformerFn(data);
  }
}
