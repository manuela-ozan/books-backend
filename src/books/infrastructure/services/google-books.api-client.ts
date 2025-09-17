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
   * Search for books by title in Google Books
   * @param query Title or keyword
   * @returns List of GoogleBookItems
   */
  async searchBooks(query: string): Promise<GoogleBookItem[]> {
    const queryEncoded = encodeURIComponent(`intitle:"${query}"`);
    const res = await axios.get<GoogleBooksSearchResponse>(
      `${this.API_URL}?q=${queryEncoded}`,
    );
    return res.data.items || [];
  }

  /**
   * Gets a book by ID
   * @param id The book's ID in Google Books
   * @returns GoogleBookItem or null
   */
  async getBook(id: string): Promise<GoogleBookItem | null> {
    const res = await axios.get<GoogleBookItem>(`${this.API_URL}/${id}`);
    return res.data || null;
  }
}
