import { Module } from '@nestjs/common';
import { Bcrypt } from './services/bcrypt';

@Module({
  controllers: [],
  providers: [Bcrypt],
  exports: [Bcrypt],
})
export class CommonModule {}
