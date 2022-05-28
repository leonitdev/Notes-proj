import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/repositories/schema/note.schema';
import { NoteRepository } from 'src/repositories/note.repository';
import { NoteService } from 'src/modules/notes/note.service';
import { NoteController } from './note.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Note.name,
        schema: NoteSchema,
      },
    ]),
  ],
  //
  controllers: [NoteController],
  providers: [NoteService, NoteRepository],
  exports: [],
})
export class NoteModule {}
