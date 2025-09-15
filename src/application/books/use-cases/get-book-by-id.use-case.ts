import { Inject, Injectable } from '@nestjs/common';
import {
  BOOK_REPOSITORY,
  type BookRepository,
} from 'src/domain/books/repositories/book.repository';
import { Book } from 'src/domain/books/entities/book.entity';

@Injectable()
export class GetBookByIdUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository,
  ) {}

  async execute(id: string): Promise<Book | null> {
    return this.bookRepository.getBookById(id);
  }
}
