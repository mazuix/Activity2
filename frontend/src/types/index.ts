export type User = {
  id: string;
  username: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  access_token: string;
};

export type LoginDto = {
  username: string;
  password: string;
};

export type CreateUserDto = {
  username: string;
  password: string;
};

export type CreateNoteDto = {
  title: string;
  content: string;
};

export type UpdateNoteDto = {
  title?: string;
  content?: string;
};
