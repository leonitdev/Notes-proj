import { ConsoleLogger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { port } from './infrastructure/configs';
import { HttpExceptionFilter } from './infrastructure/middlewares/exeptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger(),
  });

  //validate req
  app.useGlobalPipes(new ValidationPipe());

  //validate res
  app.useGlobalFilters(new HttpExceptionFilter());

  app.setGlobalPrefix('/api/');
  app.enableCors();

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Notes Base Api')
    .setDescription('The Notes API description')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
}
bootstrap();
