import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const allowedOrigins = [process.env.APP_ORIGIN];

async function bootstrap() {
  // Iniciar la aplicación desde el módulo principal
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para todas las rutas de la aplicación con los orígenes permitidos
  app.enableCors({
    origin: (origin: string, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  // Establece el prefijo de ruta global para todas las rutas de la aplicación
  app.setGlobalPrefix('api');

  // Habilita la validación de los DTOs de la aplicación
  app.useGlobalPipes(
    new ValidationPipe({
      // El validador quitará al objeto validado cualquier propiedad que no utilice ningún decorador de validación
      whitelist: true,
      // En lugar de eliminar las propiedades no incluidas en la lista blanca, el validador arrojará un error
      forbidNonWhitelisted: true,
      // Transforma automáticamente objetos en una llamada para que sean objetos tipados según sus clases DTO
      transform: true,
      transformOptions: {
        // El transformador de clase intentará la conversión según el tipo reflejado de TS
        enableImplicitConversion: true,
      },
    }),
  );

  // Habilita el registro de las solicitudes HTTP en consola en entornos de desarrollo y pruebas
  app.useLogger(new Logger());

  // Elimina la cabecera X-Powered-By de las respuestas
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.removeHeader('X-Powered-By');
    next();
  });

  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Server running on port ${process.env.PORT}`, 'NestApplication');
}

void bootstrap();
