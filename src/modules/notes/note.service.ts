import { HttpStatus, Injectable } from '@nestjs/common';
import { Note } from 'src/repositories/schema/note.schema';
import {
  CreateResponseObject,
  ResponseArray,
} from 'src/types/response/api.response';
import { NoteRepository } from 'src/repositories/note.repository';
import { CreateNoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly repository: NoteRepository) {}

  async getNotes(query) {
    const Notes = await this.repository.getNotes(query);
    return new ResponseArray<Note>(true, HttpStatus.OK, Notes);
  }

  async createNote(body: CreateNoteDto) {
    const note = await this.repository.createNote(body);

    return new CreateResponseObject<Note>(
      true,
      HttpStatus.CREATED,
      `urlLink/${note.id}`,
      note,
    );
  }
}
