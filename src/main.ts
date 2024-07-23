import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Interceptions
  app.useGlobalPipes(
    new ValidationPipe({whitelist: true}) //whitelist is thr to strip out unwanted data from the body -> it ensures it accept onlt whats in the DTO
  )

  // Swagger
  const config = new DocumentBuilder()
  .setTitle('Task Management API Documentation')
  .setDescription('This documentation provides use cases for different endpoints available')
  .addBearerAuth()
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('task-management', app, document);

  await app.listen(3000);
}
bootstrap();
