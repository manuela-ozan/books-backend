import { Test, TestingModule } from '@nestjs/testing';
import { GetBookByIdUseCase } from 'src/books/application/use-cases/get-book-by-id.use-case';
import { Book } from 'src/books/domain/entities/book.entity';
import { BOOK_REPOSITORY } from 'src/books/domain/repositories/book.repository';

describe('GetBookByIdUseCase', () => {
  let useCase: GetBookByIdUseCase;
  let mockRepo: any;

  beforeEach(async () => {
    mockRepo = { getBookById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetBookByIdUseCase,
        { provide: BOOK_REPOSITORY, useValue: mockRepo },
      ],
    }).compile();

    useCase = module.get<GetBookByIdUseCase>(GetBookByIdUseCase);
  });

  it('should return a book by id', async () => {
    const book = new Book('1', 'Title', ['Author'], '2020-01-01');
    mockRepo.getBookById.mockResolvedValue(book);

    const result = await useCase.execute('1');

    expect(result).toEqual(book);
    expect(mockRepo.getBookById).toHaveBeenCalledWith('1');
  });

  it('should return null if book not found', async () => {
    mockRepo.getBookById.mockResolvedValue(null);

    const result = await useCase.execute('2');

    expect(result).toBeNull();
    expect(mockRepo.getBookById).toHaveBeenCalledWith('2');
  });
});
