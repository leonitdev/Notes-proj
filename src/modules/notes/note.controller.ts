import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { NoteService } from 'src/modules/notes/note.service';
import { Note } from 'src/repositories/schema/note.schema';
import { CreateNoteDto } from './dto/note.dto';

@Controller('notes')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @ApiOkResponse({ type: Note, isArray: true })
  @Get()
  async getNotes(@Res() res: Response, @Req() req: Request) {
    const items = await this.service.getNotes(req.query);
    const { status } = items;

    return res.status(status).json(items);
  }

  @ApiCreatedResponse({ type: Note })
  @Post()
  async createNote(@Res() res: Response, @Body() body: CreateNoteDto) {
    const item = await this.service.createNote(body);
    return res.status(201).json(item);
  }
}
