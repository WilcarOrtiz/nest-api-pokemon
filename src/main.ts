import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,

      //*esta parte es para indicar que transforme el dato al valor implicito si la en la url tenemos limit=10 este 10 por deafult es string pero con esto de abajo lo pasa a int
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.setGlobalPrefix('api/v2');
  await app.listen(process.env.PORT!);
  console.log(`App running on port ${process.env.PORT}`);
}
bootstrap();

//TODO: MongoDB- aprovisionamiento
