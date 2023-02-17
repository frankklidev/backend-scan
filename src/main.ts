import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors:true
  });
  app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin:['http://127.0.0.1:5173/'],
  //   methods:['GET','PUT','POST','PATCH','DELETE']
  // });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true, })
  );
  await app.listen(3000);
}
bootstrap();
