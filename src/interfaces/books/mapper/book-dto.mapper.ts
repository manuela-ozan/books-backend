import { Injectable } from '@nestjs/common';
import { BookDto } from 'src/application/books/dto/book.dto';
import { Book } from 'src/domain/books/entities/book.entity';

@Injectable()
export class BookDtoMapper {
  toDto(book: Book): BookDto {
    return { ...book };
  }

  toDtoList(books: Book[]): BookDto[] {
    return books.map((b) => this.toDto(b));
  }
}
