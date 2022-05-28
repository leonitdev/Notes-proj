import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { NoteService } from 'src/modules/notes/note.service';
import { Note } from 'src/repositories/schema/note.schema';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Controller('v1/notes')
export class NoteController {
  constructor(private readonly service: NoteService) {}

  @ApiOkResponse({ type: Note, isArray: true })
  @Get()
  async getNotes(@Res() res: Response, @Req() req: Request) {
    const items = await this.service.getNotes(req.query);
    const { status } = items;

    return res.status(status).json(items);
  }

  @ApiOkResponse({ type: Note })
  @Get(':id')
  async getNoteById(@Res() res: Response, @Param() id: string) {
    const item = await this.service.getNoteById(id);
    return res.status(200).json(item);
  }

  @ApiCreatedResponse({ type: Note })
  @Post()
  async createNote(@Res() res: Response, @Body() body: CreateNoteDto) {
    const item = await this.service.createNote(body);
    return res.status(201).json(item);
  }

  @ApiOkResponse({ type: Note })
  @Get(':id')
  async updateNote(
    @Res() res: Response,
    @Param() id: string,
    @Body() body: UpdateNoteDto,
  ) {
    const item = await this.service.updateNote(id, body);
    return res.status(200).json(item);
  }

  @ApiOkResponse({ type: Note })
  @Get(':id')
  async deleteNote(@Res() res: Response, @Param() id: string) {
    const item = await this.service.deleteNote(id);
    return res.status(200).json(item);
  }
}
