import { Module } from '@nestjs/common';
import { BooksController } from './interfaces/books/books.controller';
import { GetBooksUseCase } from './application/books/use-cases/get-books.use-case';
import { GetBookByIdUseCase } from './application/books/use-cases/get-book-by-id.use-case';
import { GoogleBooksApiClient } from './infrastructure/books/services/google-books.api-client';
import { GoogleBooksMapper } from './infrastructure/books/mappers/google-books.mapper';
import { GoogleBooksRepository } from './infrastructure/books/repositories/google-books.repository';
import { BookDtoMapper } from './interfaces/books/mapper/book-dto.mapper';
import { BOOK_REPOSITORY } from './domain/books/repositories/book.repository';

@Module({
  controllers: [BooksController],
  providers: [
    GetBooksUseCase,
    GetBookByIdUseCase,
    GoogleBooksApiClient,
    GoogleBooksMapper,
    BookDtoMapper,
    {
      provide: BOOK_REPOSITORY,
      useClass: GoogleBooksRepository,
    },
  ],
})
export class BooksModule {}
