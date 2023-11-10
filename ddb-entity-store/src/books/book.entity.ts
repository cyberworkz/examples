import { DynamoDBValues, createEntity } from '@symphoniacloud/dynamodb-entity-store';
import { IBook } from './ibook';

const isBook = (x: DynamoDBValues): x is IBook {
    const candidate = x as IBook;
    return candidate.author.firstName !== undefined && candidate.author.lastName !== undefined
    && candidate.isbn !== undefined && candidate.title !== undefined;
};

export const BOOK_ENTITY = createEntity(
    'BOOK',
    isBook,
    ({isbn}: Pick<IBook, 'isbn'>) => 'BOOK#${isbn}',
    ({isbn}: Pick<IBook, 'isbn'>) => 'BOOK#${isbn}',
);
