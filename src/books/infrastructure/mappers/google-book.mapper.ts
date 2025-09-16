import { Injectable } from '@nestjs/common';
import { GoogleBookItem } from '../types/google-books.types';
import { Book } from 'src/books/domain/entities/book.entity';

/**
 * Mapper que convierte la respuesta de Google Books en entidad de dominio Book
 */
@Injectable()
export class GoogleBooksMapper {
  toDomain(item: GoogleBookItem): Book {
    const info = item.volumeInfo;
    return new Book(
      item.id,
      info.title || 'Sin título',
      info.authors || ['Desconocido'],
      info.publishedDate || 'Desconocida',
      info.imageLinks?.thumbnail,
    );
  }

  toDomainList(items: GoogleBookItem[]): Book[] {
    return items.map(this.toDomain);
  }
}
