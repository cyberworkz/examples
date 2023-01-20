import { BooksRepository } from './books.repository';

describe('BooksRepository', () => {
  it('should be defined', () => {
    expect(new BooksRepository()).toBeDefined();
  });
});
