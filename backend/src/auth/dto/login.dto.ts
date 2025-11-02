import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

// For Swagger
export class LoginDto {
  @ApiProperty({ example: 'mazui' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'Neuvi_001' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

