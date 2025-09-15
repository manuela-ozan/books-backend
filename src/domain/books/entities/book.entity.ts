/**
 * Entidad de dominio Book
 * Define los atributos que representan un libro dentro del sistema.
 * No depende de infraestructura ni de librerías externas.
 */
export class Book {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly authors: string[],
    public readonly publishedDate: string,
    public readonly thumbnail?: string,
  ) {}
}
