import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JoiValidationSchema } from './_core/config/joi.validation';
import { LoggerMiddleware } from './_core/middlewares/logger.middleware';
import { CommonModule } from './_core/common/common.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './_core/auth/auth.module';
import { StateModule } from './state/state.module';
import { PlaceModule } from './place/place.module';
import { CategoryModule } from './category/category.module';
import { AuthorModule } from './author/author.module';
import { LoanModule } from './loan/loan.module';
import { ReadingModule } from './reading/reading.module';
import { BookModule } from './book/book.module';
import { SagaModule } from './saga/saga.module';

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
    CommonModule,
    UserModule,
    AuthModule,
    StateModule,
    PlaceModule,
    CategoryModule,
    AuthorModule,
    LoanModule,
    ReadingModule,
    BookModule,
    SagaModule,
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
