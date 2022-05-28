import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from 'src/modules/notes/dto/note.dto';

export type NoteDocument = Note & Document;

@Schema({ versionKey: false })
export class Note {
  @Prop()
  id: string;
  /**
   *
   *
   */
  @ApiProperty({
    description: 'Description of the Note',
    type: String,
  })
  @Prop({
    type: 'string',
    minlength: 3,
    maxlength: 800,
  })
  noteBody: string;
  /**
   *
   *
   */
  @ApiProperty({
    description: 'x Position of the Note',
    type: Number,
  })
  @Prop({
    type: 'number',
  })
  xPosition: number;
  /**
   *
   *
   */
  @ApiProperty({
    description: 'y Position of the Note',
    type: Number,
  })
  @Prop({
    type: 'number',
  })
  yPosition: number;
  /**
   *
   *
   */
  @ApiProperty({
    description: 'Creation date of Note',
    type: String,
  })
  @Prop({
    type: Date,
    default: new Date(),
  })
  createdAt: Date;

  /**
   *
   */
  constructor(dto: CreateNoteDto) {
    const { noteBody, xPosition, yPosition } = dto;
    this.noteBody = noteBody;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.createdAt = new Date();
  }
}

export const NoteSchema = SchemaFactory.createForClass(Note).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});
