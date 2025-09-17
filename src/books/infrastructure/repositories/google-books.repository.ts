import { Injectable } from '@nestjs/common';
import { GoogleBooksApiClient } from '../services/google-books.api-client';
import { BookRepository } from 'src/books/domain/repositories/book.repository';
import { GoogleBooksMapper } from '../mappers/google-book.mapper';
import { Book } from 'src/books/domain/entities/book.entity';

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
