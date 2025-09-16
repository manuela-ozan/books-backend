import { Module } from '@nestjs/common';
import { BooksController } from './interfaces/controller/books.controller';
import { GetBooksUseCase } from './application/use-cases/get-books.use-case';
import { GetBookByIdUseCase } from './application/use-cases/get-book-by-id.use-case';
import { GoogleBooksApiClient } from './infrastructure/services/google-books.api-client';
import { GoogleBooksMapper } from './infrastructure/mappers/google-book.mapper';
import { BookDtoMapper } from './interfaces/mapper/book-dto.mapper';
import { BOOK_REPOSITORY } from './domain/repositories/book.repository';
import { GoogleBooksRepository } from './infrastructure/repositories/google-books.repository';

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
