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
  @ApiOperation({ summary: 'Obtiene una lista de libros por búsqueda' })
  @ApiQuery({ name: 'q', required: true, description: 'Término de búsqueda' })
  @ApiResponse({ status: 200, description: 'Lista de libros', type: [BookDto] })
  async getBooks(@Query('q') query: string): Promise<BookDto[]> {
    const books = await this.getBooksUseCase.execute(query);
    return this.bookDtoMapper.toDtoList(books);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un libro por su ID' })
  @ApiParam({ name: 'id', description: 'ID del libro' })
  @ApiResponse({ status: 200, description: 'Libro encontrado', type: BookDto })
  @ApiResponse({ status: 404, description: 'Libro no encontrado' })
  async getBookById(@Param('id') id: string): Promise<BookDto> {
    const book = await this.getBookByIdUseCase.execute(id);
    if (!book) {
      throw new HttpException('Libro no encontrado', HttpStatus.NOT_FOUND);
    }
    return this.bookDtoMapper.toDto(book);
  }
}
