import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetBooksUseCase } from 'src/application/books/use-cases/get-books.use-case';
import { GetBookByIdUseCase } from 'src/application/books/use-cases/get-book-by-id.use-case';
import { BookDto } from '../../application/books/dto/book.dto';
import { BookDtoMapper } from './mapper/book-dto.mapper';

@Controller('books')
export class BooksController {
  constructor(
    private readonly getBooksUseCase: GetBooksUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly bookDtoMapper: BookDtoMapper,
  ) {}

  @Get()
  async getBooks(@Query('q') query: string): Promise<BookDto[]> {
    const books = await this.getBooksUseCase.execute(query);
    return this.bookDtoMapper.toDtoList(books);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<BookDto | null> {
    const book = await this.getBookByIdUseCase.execute(id);
    return book ? this.bookDtoMapper.toDto(book) : null;
  }
}
