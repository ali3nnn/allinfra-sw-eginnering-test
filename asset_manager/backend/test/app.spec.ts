import { AssetsController } from '../src/assets/assets.controller'
import { AssetsService } from '../src/assets/assets.service'
import { AssetsModule } from '../src/assets/assets.module'
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Assets } from '../src/assets/entities/asset.entity'
import { HttpModule } from '@nestjs/common';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
    
//   });

//   it('/ (GET)', () => {
//     return request(app.getHttpServer()).get('/assets')
//       .expect(200)
//       .expect([]);
//   });
// });