import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { NotesModule } from './notes/notes.module';
import { User } from './database/user.entity';
import { Note } from './database/note.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'notes.db',
      entities: [User, Note],
      synchronize: true, // ← Make sure this is TRUE for development
    }),
    AuthModule,
    UsersModule,
    NotesModule,
  ],
})
export class AppModule {}