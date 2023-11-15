import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {
    AllEntitiesStore,
    SingleEntityOperations,
    createStandardSingleTableConfig,
    createStore,
    rangeWhereSkBeginsWith, consoleLogger, createStoreContext
} from '@symphoniacloud/dynamodb-entity-store';
import * as AWS from 'aws-sdk';
import {BOOK_ENTITY} from './book.entity';
import {Book} from './book';
import {AuthorBook} from './authorBook';
import {AUTHOR_BOOK_ENTITY} from './authorBook.entity';
import {startWith} from 'rxjs';
import logger from '@vendia/serverless-express/src/logger';

@Injectable()
export class BooksRepository {

    private readonly tableName: string;
    private db: AllEntitiesStore;
    private bookStore: SingleEntityOperations<Book, Pick<Book, 'isbn'>, Pick<Book, 'isbn'>>;
    private authorBookStore: SingleEntityOperations<AuthorBook, Pick<AuthorBook, 'firstName' | 'lastName'>, Pick<AuthorBook, 'isbn'>>;
    private bookPrefix = 'BOOK#';
    private authorPrefix = 'AUTH#';

    constructor() {
        this.tableName = 'online-library';
        const storeContext = createStoreContext({ logger: consoleLogger });
        this.db = createStore(createStandardSingleTableConfig(this.tableName), storeContext);
        this.bookStore = this.db.for(BOOK_ENTITY);
        this.authorBookStore = this.db.for(AUTHOR_BOOK_ENTITY);
    }

    async getBook(isbn: number) {
        let book: Book;

        try {
            book = await this.bookStore.getOrThrow({isbn});
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!book) {
            throw new NotFoundException(`Book with ISBN "${isbn}" not found`);
        }

        return book;
    }

    async getBooksByAuthor(lastName: string, firstName: string) {
        let books: AuthorBook[] = [];

        const authorPK = this.authorPrefix.concat(lastName.toUpperCase()).concat('_').concat(firstName.toUpperCase());
        books = await this.authorBookStore.queryAllByPkAndSk({firstName, lastName},
            rangeWhereSkBeginsWith(this.bookPrefix), {scanIndexForward: false});

        return books;
    }
}
