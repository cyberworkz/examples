import { DynamoDBValues, createEntity } from '@symphoniacloud/dynamodb-entity-store';
import { Book } from './book';

const isBook = (x: DynamoDBValues): x is Book => {
    const candidate = x as Book;
    return candidate.Author !== undefined && candidate.Title !== undefined;
};

export const BOOK_ENTITY = createEntity(
    'BOOK',
    isBook,
    ({isbn}: Pick<Book, 'isbn'>) => 'BOOK#' + isbn,
    ({isbn}: Pick<Book, 'isbn'>) => 'BOOK#' + isbn,
);
