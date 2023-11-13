import { DynamoDBValues, createEntity } from '@symphoniacloud/dynamodb-entity-store';
import { Book } from './book';

const isBook = (x: DynamoDBValues): x is Book => {
    const candidate = x as Book;
    return candidate.author.firstName !== undefined && candidate.author.lastName !== undefined
    && candidate.isbn !== undefined && candidate.title !== undefined;
};

export const BOOK_ENTITY = createEntity(
    'BOOK',
    isBook,
    ({isbn}: Pick<Book, 'isbn'>) => 'BOOK#$',
    ({isbn}: Pick<Book, 'isbn'>) => 'BOOK#${isbn}',
);
