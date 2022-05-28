import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from 'src/repositories/schema/note.schema';
import { NoteRepository } from 'src/repositories/note.repository';
import { NoteService } from 'src/modules/notes/note.service';

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
  // when other modules, want to use services, or repositories of this module
  // we export them, then we import this module, to the module that wants to use this providers.
  exports: [],
})
export class NoteModule {}
