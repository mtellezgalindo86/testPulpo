import { Module } from '@nestjs/common';
import {ADIModule} from './adi.module';

@Module({
  imports: [ADIModule],
})
export class AppModule {}