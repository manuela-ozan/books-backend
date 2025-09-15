import { Book } from '../entities/book.entity';

/**
 * Interfaz de repositorio de Books
 * Define qué métodos debe implementar cualquier repositorio que gestione libros.
 * No importa si los libros vienen de DB, API externa o memoria.
 */

export const BOOK_REPOSITORY = 'BookRepository';

export interface BookRepository {
  getBooks(query: string): Promise<Book[]>;
  getBookById(id: string): Promise<Book | null>;
}
