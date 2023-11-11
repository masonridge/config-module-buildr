import { Inject, Injectable } from '@nestjs/common';
import {
  DynamicEnvProxyModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from './dynamic-env-proxy.definition';

@Injectable()
export class DynamicEnvProxyService {
  public readonly env: NodeJS.ProcessEnv;
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: DynamicEnvProxyModuleOptions,
  ) {
    this.env = process.env;
    options.exclude.forEach((val) => {
      delete this.env[val];
    });
  }
}
