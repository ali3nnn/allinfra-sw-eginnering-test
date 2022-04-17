import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from './assets/assets.module'

@Module({
  imports: [AssetsModule]
})
export class AppModule { }
