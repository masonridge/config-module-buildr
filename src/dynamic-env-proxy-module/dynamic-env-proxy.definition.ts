// interface for config to be passed in
import { ConfigurableModuleBuilder } from '@nestjs/common';

// export ConfigurableModuleClass, MODULE_OPTIONS_TOKEN
export interface DynamicEnvProxyModuleOptions {
  exclude: string[];
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DynamicEnvProxyModuleOptions>({
    moduleName: 'DynamicEnvProxy',
  }).build();
