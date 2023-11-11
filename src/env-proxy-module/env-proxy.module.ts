import { Global, Module } from '@nestjs/common';
import { EnvProxyService } from './env-proxy.service';
@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [EnvProxyService],
  exports: [EnvProxyService],
})
export class EnvProxyModule {}
