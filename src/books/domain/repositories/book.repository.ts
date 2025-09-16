import { Book } from '../entities/book.entity';

export const BOOK_REPOSITORY = 'BookRepository';

/**
 * Contrato de repositorio para gestionar libros
 */
export interface BookRepository {
  getBooks(query: string): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
}
