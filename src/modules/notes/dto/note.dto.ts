import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  memberId: number;

  @ApiProperty()
  @MaxLength(800)
  @MinLength(3)
  @IsString()
  @IsNotEmpty()
  noteBody: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  xPosition: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  yPosition: number;
}

export class UpdateNoteDto extends CreateNoteDto {}
