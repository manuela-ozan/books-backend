import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Book } from 'src/books/domain/entities/book.entity';
import { BOOK_REPOSITORY } from 'src/books/domain/repositories/book.repository';
import type { BookRepository } from 'src/books/domain/repositories/book.repository';

/**
 * Use case for getting a list of books
 */

@Injectable()
export class GetBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository,
  ) {}

  /**
   * Runs a book search
   * @param query Search term
   * @returns List of books
   */
  async execute(query: string): Promise<Book[]> {
    try {
      const books = await this.bookRepository.getBooks(query);
      return books;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve the list of books',
      );
    }
  }
}
