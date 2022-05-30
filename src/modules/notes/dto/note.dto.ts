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
  @MaxLength(800)
  @MinLength(3)
  @IsString()
  @IsNotEmpty({ message: 'Note must not be empty!' })
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
