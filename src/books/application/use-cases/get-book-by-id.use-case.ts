import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Book } from 'src/books/domain/entities/book.entity';
import {
  BOOK_REPOSITORY,
  type BookRepository,
} from 'src/books/domain/repositories/book.repository';

/**
 * Use case to get a book by its ID
 */

@Injectable()
export class GetBookByIdUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository,
  ) {}

  /**
   * Executes the search for a book by ID
   * @param id Book ID
   * @returns Found book or null
   */
  async execute(id: string): Promise<Book> {
    try {
      const book = await this.bookRepository.getBookById(id);
      if (!book) {
        throw new NotFoundException(`Book with id ${id} not found`);
      }
      return book;
    } catch (error) {
      throw new InternalServerErrorException('Failed to get book');
    }
  }
}
