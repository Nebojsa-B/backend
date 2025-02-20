import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync('./security/cert.key'),
    cert: fs.readFileSync('./security/cert.pem'),
  };
  
  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'https://localhost:4200',
    credentials: true,
  })

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
