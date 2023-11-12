import { Module } from '@nestjs/common';
import { JsonParserService } from './json-parser.service';
import { userSchema } from './user-schema';

@Module({
  providers: [
    JsonParserService,
    {
      provide: 'JSON_CONFIG_OPTIONS',
      useValue: {
        schema: userSchema,
        transformerFn: (data: User) => {
          return {
            ...data,
            timestamp: new Date().toISOString(),
          };
        },
      },
    },
  ],
})
export class JsonParserModule {}
