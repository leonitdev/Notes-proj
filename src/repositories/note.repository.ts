import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoErrorCode } from 'src/infrastructure/constants/mongo-error.constant';
import { CreateNoteDto } from 'src/modules/users/dto/note.dto';
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
      const { code } = error;
      if (code === MongoErrorCode.DUPLICATE_KEY) {
        const message = `This User already exists`;
        throw new ConflictException(message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async getUserById(id: string): Promise<Note> {
    try {
      return this.model.findOne({ _id: id }).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateNote(query: any): Promise<Note[]> {
    try {
      return this.model.find(query).exec();
    } catch (error) {
      const { code } = error;
      if (code === MongoErrorCode.DUPLICATE_KEY) {
        const message = `This Note already exists`;
        throw new ConflictException(message);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async deleteNote(query: any): Promise<Note[]> {
    try {
      return this.model.find(query).exec();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
