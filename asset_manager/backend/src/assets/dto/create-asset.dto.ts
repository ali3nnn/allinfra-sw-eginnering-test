import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from 'class-validator';

export class CreateAssetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  serial: string;
  
  @ApiProperty()
  @IsString()
  type: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;
  
  @ApiProperty()
  @IsObject()
  @IsNotEmptyObject()
  metadata: object;
}