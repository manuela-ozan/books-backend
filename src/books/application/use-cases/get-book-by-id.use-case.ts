import { Inject, Injectable } from '@nestjs/common';
import { Book } from 'src/books/domain/entities/book.entity';
import {
  BOOK_REPOSITORY,
  type BookRepository,
} from 'src/books/domain/repositories/book.repository';

/**
 * Caso de uso para obtener un libro por su ID
 */
@Injectable()
export class GetBookByIdUseCase {
  constructor(
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository,
  ) {}

  /**
   * Ejecuta la búsqueda de un libro por ID
   * @param id ID del libro
   * @returns Libro encontrado o null
   */
  async execute(id: string): Promise<Book | null> {
    return this.bookRepository.getBookById(id);
  }
}
