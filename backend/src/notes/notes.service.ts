

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../database/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const note = this.notesRepository.create({
      ...createNoteDto,
      user: { id: userId }, 
    });
    return this.notesRepository.save(note);
  }

  /**
   * Find all notes for a specific user.
   */
  // THIS IS THE FIX: Make sure the return type is Promise<Note[]>
  findAll(userId: string): Promise<Note[]> {
    return this.notesRepository.find({
      where: { user: { id: userId } },
      order: { updatedAt: 'DESC' }, 
    });
  }

  async findOne(id: string, userId: string): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id },
      relations: ['user'], 
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }
    if (note.user.id !== userId) {
      throw new ForbiddenException('You do not own this note');
    }
    return note;
  }

  async update(
    id: string,
    updateNoteDto: UpdateNoteDto,
    userId: string,
  ): Promise<Note> {
    const note = await this.findOne(id, userId);
    const updatedNote = this.notesRepository.merge(note, updateNoteDto);
    return this.notesRepository.save(updatedNote);
  }

  async remove(id: string, userId: string): Promise<void> {
    const note = await this.findOne(id, userId);
    await this.notesRepository.remove(note);
  }
}

