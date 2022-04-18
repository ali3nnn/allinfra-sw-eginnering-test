import * as mongodb from "mongodb";
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Assets } from './entities/asset.entity';

@Injectable()
export class AssetsService {

  constructor(
    @InjectRepository(Assets)
    private assetsRepository: Repository<Assets>,
  ) { }

  async create(createAssetDto: CreateAssetDto) {
    const asset = this.assetsRepository.create(createAssetDto)
    const result = await this.assetsRepository.save(asset);
    return result;
  }

  async findOne(_id: string) {
    const result = await this.assetsRepository.findOneBy({ _id: new mongodb.ObjectID(_id) });
    return result
  }

  async findAll() {
    try {
      const result = await this.assetsRepository.find();
      return result
    } catch(e) {
      throw {
        status: 500
      }
    }
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    const result = await this.assetsRepository.update(id, updateAssetDto);
    const item = await this.findOne(id)
    return {
      result,
      item
    }
  }

  async remove(id: string) {
    const result = await this.assetsRepository.delete(id);
    return {
      result
    }
  }
}
