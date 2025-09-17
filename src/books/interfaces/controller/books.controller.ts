import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { GetBookByIdUseCase } from 'src/books/application/use-cases/get-book-by-id.use-case';
import { GetBooksUseCase } from 'src/books/application/use-cases/get-books.use-case';
import { BookDtoMapper } from '../mapper/book-dto.mapper';
import { BookDto } from 'src/books/application/dto/book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly getBooksUseCase: GetBooksUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly bookDtoMapper: BookDtoMapper,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of books by search.' })
  @ApiQuery({ name: 'q', required: true, description: 'Search term' })
  @ApiResponse({ status: 200, description: 'List of books', type: [BookDto] })
  async getBooks(@Query('q') query: string): Promise<BookDto[]> {
    try {
      const books = await this.getBooksUseCase.execute(query);
      return this.bookDtoMapper.toDtoList(books);
    } catch (error) {
      throw new HttpException(
        `Error retrieving books: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by your ID' })
  @ApiParam({ name: 'id', description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book found', type: BookDto })
  @ApiResponse({ status: 404, description: 'Book not found' })
  async getBookById(@Param('id') id: string): Promise<BookDto> {
    try {
      const book = await this.getBookByIdUseCase.execute(id);
      if (!book) {
        throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
      }
      return this.bookDtoMapper.toDto(book);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error; 
      }
      throw new HttpException(
        `Error retrieving book with ID ${id}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
