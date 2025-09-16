import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  GoogleBooksSearchResponse,
  GoogleBookItem,
} from '../types/google-books.types';

@Injectable()
export class GoogleBooksApiClient {
  private readonly API_URL = 'https://www.googleapis.com/books/v1/volumes';

  /**
   * Busca libros por título en Google Books
   * @param query Título o palabra clave
   * @returns Lista de GoogleBookItem
   */
  async searchBooks(query: string): Promise<GoogleBookItem[]> {
    const queryEncoded = encodeURIComponent(`intitle:"${query}"`);
    const res = await axios.get<GoogleBooksSearchResponse>(
      `${this.API_URL}?q=${queryEncoded}`,
    );
    return res.data.items || [];
  }

  /**
   * Obtiene un libro por ID
   * @param id ID del libro en Google Books
   * @returns GoogleBookItem o null
   */
  async getBook(id: string): Promise<GoogleBookItem | null> {
    const res = await axios.get<GoogleBookItem>(`${this.API_URL}/${id}`);
    return res.data || null;
  }
}
