import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Notes')
@ApiBearerAuth() // Tells Swagger this endpoint needs a Bearer token
@UseGuards(JwtAuthGuard) // Protect all routes in this controller
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    // req.user is attached by the JwtAuthGuard (from JwtStrategy)
    return this.notesService.create(createNoteDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: "Get all of the user's notes" })
  findAll(@Request() req) {
    return this.notesService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single note by ID' })
  findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.notesService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note by ID' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req,
  ) {
    return this.notesService.update(id, updateNoteDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note by ID' })
  remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.notesService.remove(id, req.user.id);
  }
}

