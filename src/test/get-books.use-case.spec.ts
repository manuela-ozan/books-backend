import { Test, TestingModule } from '@nestjs/testing';
import { GetBooksUseCase } from 'src/books/application/use-cases/get-books.use-case';
import { Book } from 'src/books/domain/entities/book.entity';
import { BOOK_REPOSITORY } from 'src/books/domain/repositories/book.repository';

describe('GetBooksUseCase', () => {
  let useCase: GetBooksUseCase;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = {
      getBooks: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBooksUseCase,
        { provide: BOOK_REPOSITORY, useValue: mockRepo },
      ],
    }).compile();

    useCase = module.get<GetBooksUseCase>(GetBooksUseCase);
  });

  it('should return a list of books', async () => {
    const books: Book[] = [
      new Book('1', 'Title 1', ['Author 1'], '2020-01-01'),
    ];
    mockRepo.getBooks.mockResolvedValue(books);

    const result = await useCase.execute('any query');

    expect(result).toEqual(books);
    expect(mockRepo.getBooks).toHaveBeenCalledWith('any query');
  });
});
