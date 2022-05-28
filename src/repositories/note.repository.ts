import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNoteDto, UpdateNoteDto } from 'src/modules/notes/dto/note.dto';
import { Note, NoteDocument } from './schema/note.schema';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectModel(Note.name) private readonly model: Model<NoteDocument>,
  ) {}

  async getNotes(query: any): Promise<Note[]> {
    try {
      return this.model.find(query).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createNote(body: CreateNoteDto): Promise<Note> {
    try {
      const note = new Note(body);

      const item = new this.model(note);
      item.save();

      return item;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getNoteById(id: string): Promise<Note> {
    try {
      return this.model.findOne({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateNote(id: string, body: UpdateNoteDto): Promise<Note> {
    try {
      return this.model.findOneAndUpdate({ _id: id }, { set: body }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteNote(id: string): Promise<Note> {
    try {
      return this.model.findOneAndDelete({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
