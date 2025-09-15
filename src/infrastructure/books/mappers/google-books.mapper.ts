import { Injectable } from '@nestjs/common';
import { Book } from 'src/domain/books/entities/book.entity';
import { GoogleBookItem } from '../types/google-books.types';

@Injectable()
export class GoogleBooksMapper {
  toDomain(raw: GoogleBookItem): Book {
    return new Book(
      raw.id,
      raw.volumeInfo.title,
      raw.volumeInfo.authors || [],
      raw.volumeInfo.publishedDate || 'Unknown',
      raw.volumeInfo.imageLinks?.thumbnail,
    );
  }

  toDomainList(rawItems: GoogleBookItem[]): Book[] {
    return rawItems.map((item) => this.toDomain(item));
  }
}
