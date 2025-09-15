import { Injectable } from '@nestjs/common';
import { BookRepository } from 'src/domain/books/repositories/book.repository';
import { Book } from 'src/domain/books/entities/book.entity';
import { GoogleBooksMapper } from '../mappers/google-books.mapper';
import { GoogleBooksApiClient } from '../services/google-books.api-client';

@Injectable()
export class GoogleBooksRepository implements BookRepository {
  constructor(
    private readonly apiClient: GoogleBooksApiClient,
    private readonly mapper: GoogleBooksMapper,
  ) {}

  async getBooks(query: string): Promise<Book[]> {
    const data = await this.apiClient.searchBooks(query);
    return this.mapper.toDomainList(data);
  }

  async getBookById(id: string): Promise<Book | null> {
    const data = await this.apiClient.getBook(id);
    return data ? this.mapper.toDomain(data) : null;
  }
}
