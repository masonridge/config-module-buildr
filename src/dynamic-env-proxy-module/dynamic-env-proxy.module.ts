import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './dynamic-env-proxy.definition';
import { DynamicEnvProxyService } from './dynamic-env-proxy.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DynamicEnvProxyService],
  exports: [DynamicEnvProxyService],
})
export class DynamicEnvProxyModule extends ConfigurableModuleClass {}
