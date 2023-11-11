import { Injectable } from '@nestjs/common';
import { EnvProxyService } from '../env-proxy-module/env-proxy.service';
import { DynamicEnvProxyService } from '../dynamic-env-proxy-module/dynamic-env-proxy.service';

@Injectable()
export class ApiService {
  constructor(
    private readonly envProxy: EnvProxyService,
    private readonly dynamicEnvProxy: DynamicEnvProxyService,
  ) {}
  getHello(): string {
    return this.envProxy.env.DATA;
    return 'Hello World!';
  }
  getDynamicData(): string {
    return this.dynamicEnvProxy.env.DATA ?? this.dynamicEnvProxy.env.DATA2;
  }
}
