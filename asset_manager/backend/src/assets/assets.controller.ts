import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, HttpCode } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: CreateAssetDto })
  async create(@Body() createAssetDto: CreateAssetDto) {
    try {
      const asset = await this.assetsService.create(createAssetDto);
      console.log(asset)
      return {
        statusCode: HttpStatus.CREATED,
        message: "Asset added successfully",
        result: [asset]
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: [CreateAssetDto] })
  async findAll() {
    try {
      const result = await this.assetsService.findAll();

      if (!result.length) {
        return {
          statusCode: HttpStatus.OK,
          message: `No assets!`,
          result
        };
      } 

      return {
        statusCode: HttpStatus.OK,
        message: "Assets retrieved successfully",
        result
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // async findOne(@Param('id') id: string) {

  //   try {
  //     const result = await this.assetsService.findOne(id);
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: `Asset retrieved successfully!`,
  //       result: [result]
  //     };

  //   } catch (error) {
  //     throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }

  // }

  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: UpdateAssetDto })
  async update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    try {
      const { result, item } = await this.assetsService.update(id, updateAssetDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: `${id} updated successfully!`,
        result: [item]
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    try {
      await this.assetsService.remove(id);
      return {
        statusCode: HttpStatus.OK,
        message: `${id} removed successfully!`,
      }
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
