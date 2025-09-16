import { Injectable } from '@nestjs/common';
import { BookDto } from 'src/books/application/dto/book.dto';
import { Book } from 'src/books/domain/entities/book.entity';

/**
 * Convierte entidad Book a BookDto
 */
@Injectable()
export class BookDtoMapper {
  toDto(book: Book): BookDto {
    return { ...book };
  }

  toDtoList(books: Book[]): BookDto[] {
    return books.map((b) => this.toDto(b));
  }
}
