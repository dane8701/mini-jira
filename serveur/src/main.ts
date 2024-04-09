import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Add the HTTP methods you need
  };
  app.enableCors(corsOptions);
  await app.listen(3000);
}
bootstrap();
