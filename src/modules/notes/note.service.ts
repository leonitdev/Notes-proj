import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Note } from 'src/repositories/schema/note.schema';
import {
  CreateResponseObject,
  ResponseArray,
  ResponseObject,
} from 'src/types/response/api.response';
import { NoteRepository } from 'src/repositories/note.repository';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
import { baseUrl } from 'src/infrastructure/configs';

@Injectable()
export class NoteService {
  constructor(private readonly repository: NoteRepository) {}

  async getNotes(query) {
    const notes = await this.repository.getNotes(query);
    return new ResponseArray<Note>(true, HttpStatus.OK, notes);
  }

  async createNote(body: CreateNoteDto) {
    const note = await this.repository.createNote(body);
    return new CreateResponseObject<Note>(
      true,
      HttpStatus.CREATED,
      `${baseUrl}/notes/${note.id}`,
      note,
    );
  }

  async getNoteById(id: string) {
    const note = await this.repository.getNoteById(id);
    if (!note) {
      throw new NotFoundException(`Note with id, couldn't be found!`);
    }
    return new ResponseObject<Note>(true, HttpStatus.OK, note);
  }

  async updateNote(id: string, body: UpdateNoteDto) {
    const updatedNote = await this.repository.updateNote(id, body);
    if (!updatedNote) {
      throw new NotFoundException('This note does not exits..');
    }
    return new ResponseObject<Note>(true, HttpStatus.OK, updatedNote);
  }

  async deleteNote(id: string) {
    const deletedNote = await this.repository.deleteNote(id);
    if (!deletedNote) {
      throw new NotFoundException(`Note with this id, couldn't be found!`);
    }
    return new ResponseObject<Note>(true, HttpStatus.OK, deletedNote);
  }

  async deleteAllNotes() {
    const deletedNotes = await this.repository.deleteAllNotes();
    return new ResponseObject<Note>(true, HttpStatus.OK, deletedNotes);
  }
}
