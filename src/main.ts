import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
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

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const allErrors = errors.flatMap((err) => Object.values(err.constraints || {}));

        // If only one error exists, return it as a string, otherwise return an array
        const formattedErrors = allErrors.length === 1 ? allErrors[0] : allErrors;

        return new BadRequestException({
          statusCode: 400,
          error: "Bad Request",
          message: formattedErrors, // Flattened format
        });
      },
    })
  );

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
