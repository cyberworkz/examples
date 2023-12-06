import { DynamoDBValues, createEntity } from '@symphoniacloud/dynamodb-entity-store';
import { Book } from './book';
import {Author} from './author';
import {AuthorBook} from './authorBook';

const isAuthorBook = (x: DynamoDBValues): x is AuthorBook => {
    const candidate = x as AuthorBook;
    return candidate.Title !== undefined 
    && candidate.firstName !== undefined 
    && candidate.lastName !== undefined 
    && candidate.isbn !== undefined;
};

export const AUTHOR_BOOK_ENTITY = createEntity(
    'AUTHOR_BOOK',
    isAuthorBook,
    ({firstName, lastName}: Pick<AuthorBook, 'firstName'|'lastName'>) => 'AUTH#' + lastName.toUpperCase() + '_' + firstName.toUpperCase(),
    ({isbn}: Pick<AuthorBook, 'isbn'>) => 'BOOK#' + isbn,
);
