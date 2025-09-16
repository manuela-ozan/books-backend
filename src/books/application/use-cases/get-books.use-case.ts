import { Inject, Injectable } from '@nestjs/common';
import { Book } from 'src/books/domain/entities/book.entity';
import {
  BOOK_REPOSITORY,
} from 'src/books/domain/repositories/book.repository';
import type { BookRepository } from 'src/books/domain/repositories/book.repository';

/**
 * Caso de uso para obtener una lista de libros
 */
@Injectable()
export class GetBooksUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository,
  ) {}

  /**
   * Ejecuta la búsqueda de libros
   * @param query Término de búsqueda
   * @returns Lista de libros
   */
  async execute(query: string): Promise<Book[]> {
    return this.bookRepository.getBooks(query);
  }
}
