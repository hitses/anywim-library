import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JoiValidationSchema } from './config/joi.validation';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Configuración de las variables de entorno
      validationSchema: JoiValidationSchema,
    }),
    // Configuración de la conexión a la base de datos MongoDB
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      dbName: process.env.DB_NAME,
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // Método que genera logs en cada llamada HTTP
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*path');
  }
}
