import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation for all DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  );

  // Enable CORS (only once, before listen)
  app.enableCors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Add global API prefix
  app.setGlobalPrefix('api');

  // Set up Swagger (API Documentation)
  const config = new DocumentBuilder()
    .setTitle('CloudPad API')
    .setDescription('API for a simple notes app')
    .setVersion('1.0')
    .addBearerAuth() // Add security definition for JWT
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // Changed from 'api' to 'api-docs'

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs at http://localhost:3000/api-docs');
}
bootstrap();