/**
 * Book domain entity
 * Represents a book within the system.
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
