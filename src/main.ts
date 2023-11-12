import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import { CsvParserService } from './csv-parser/csv-parser.service';
import { JsonParserService } from './json-parser/json-parser.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const csvParserService = app.get(CsvParserService);
  const jsonParserService = app.get(JsonParserService);
  console.log(
    csvParserService.parse(
      'id, name,email\n1,mano, mano@gmail.com\n2,dino, dino@gmail.com\n',
    ),
  );
  console.log(
    jsonParserService.parse('{"id":1,"name":"mano","email":"mano@gmail.com"}'),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(3000);
}
bootstrap();
