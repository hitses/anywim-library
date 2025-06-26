import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { State, StateSchema } from './entities/state.entity';

@Module({
  controllers: [StateController],
  providers: [StateService],
  imports: [
    MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
  ],
  exports: [StateService],
})
export class StateModule {}
