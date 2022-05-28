import { HttpStatus, Injectable } from '@nestjs/common';
import { Note } from 'src/repositories/schema/note.schema';
import {
  CreateResponseObject,
  ResponseArray,
  ResponseObject,
} from 'src/types/response/api.response';
import { NoteRepository } from 'src/repositories/note.repository';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly repository: NoteRepository) {}

  async getNotes(query) {
    const Notes = await this.repository.getNotes(query);
    return new ResponseArray<Note>(true, HttpStatus.OK, Notes);
  }

  async createNote(body: CreateNoteDto) {
    const note = await this.repository.createNote(body);
    console.log('note: ', note);

    return new CreateResponseObject<Note>(
      true,
      HttpStatus.CREATED,
      `localhost:3000/api/v1/notes/${note.id}`,
      note,
    );
  }

  async getNoteById(id: string) {
    const note = await this.repository.getNoteById(id);
    return new ResponseObject<Note>(true, HttpStatus.CREATED, note);
  }

  async updateNote(id: string, body: UpdateNoteDto) {
    const note = await this.repository.updateNote(id, body);

    return new CreateResponseObject<Note>(
      true,
      HttpStatus.OK,
      `localhost:3000/api/v1/notes/${note.id}`,
      note,
    );
  }

  async deleteNote(id: string) {
    const note = await this.repository.deleteNote(id);
    return new ResponseObject<Note>(true, HttpStatus.OK, note);
  }
}
