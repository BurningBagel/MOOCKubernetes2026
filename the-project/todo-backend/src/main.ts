import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(bodyParser.json({limit: '50mb'}))

  app.enableCors({
    origin: 'http://localhost:3000' //TODO change this
  })
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
