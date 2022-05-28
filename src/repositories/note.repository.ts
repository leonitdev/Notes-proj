import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel, Schema } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
      note.id = item._id;
      item.save();

      return note;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getNoteById(id: string): Promise<Note> {
    try {
      return this.model.findOne({ _id: new Types.ObjectId(id) }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateNote(id: string, body: UpdateNoteDto): Promise<Note> {
    try {
      return this.model
        .findOneAndUpdate({ _id: new Types.ObjectId(id) }, body, { new: true })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteNote(id: string): Promise<Note> {
    try {
      return this.model
        .findOneAndDelete({ _id: new Types.ObjectId(id) })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteAllNotes(): Promise<any> {
    try {
      return this.model.deleteMany().exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
