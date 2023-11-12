import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CsvParserService } from './csv-parser/csv-parser.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const csvParserService = app.get(CsvParserService);
  console.log(
    csvParserService.parse(
      'id, name,email\n1,mano, mano@gmail.com\n2,dino, dino@gmail.com\n',
    ),
  );
  await app.listen(3000);
}
bootstrap();
