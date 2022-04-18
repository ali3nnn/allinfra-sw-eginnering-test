import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from './assets/assets.service';
import { AssetsController } from './assets/assets.controller';
import { AssetsModule } from './assets/assets.module';
import { Assets } from './assets/entities/asset.entity';

@Module({
  imports: [AssetsModule],
  controllers: [],
  providers: []
})
export class AppModule { }
