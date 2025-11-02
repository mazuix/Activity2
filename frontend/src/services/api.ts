import type {
  Note,
  AuthResponse,
  LoginDto,
  CreateUserDto,
  CreateNoteDto,
  UpdateNoteDto
} from '../types';

const API_URL = 'http://localhost:3000/api'; 

class ApiService {
  private getAuthHeaders(token: string) {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async register(data: CreateUserDto): Promise<{ id: string; username: string }> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    return response.json();
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return response.json();
  }

  async getNotes(token: string): Promise<Note[]> {
    const response = await fetch(`${API_URL}/notes`, {
      headers: this.getAuthHeaders(token),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }
    return response.json();
  }

  async createNote(token: string, data: CreateNoteDto): Promise<Note> {
    const response = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create note');
    }
    return response.json();
  }

  async updateNote(token: string, id: string, data: UpdateNoteDto): Promise<Note> {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(token),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update note');
    }
    return response.json();
  }

  async deleteNote(token: string, id: string): Promise<void> {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(token),
    });
    if (!response.ok) {
      throw new Error('Failed to delete note');
    }
  }
}

export const api = new ApiService();
