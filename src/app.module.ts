import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JoiValidationSchema } from './config/joi.validation';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
