import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { CreateAssetDto } from './create-asset.dto';

export class UpdateAssetDto extends PartialType(CreateAssetDto) {

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    serial: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    type: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    color: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsObject()
    metadata: object;
}
