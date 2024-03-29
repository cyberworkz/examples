import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {
    TableConfig,
    AllEntitiesStore,
    SingleEntityOperations,
    createStandardSingleTableConfig,
    createStore,
    rangeWhereSkBeginsWith, consoleLogger, createStoreContext
} from '@symphoniacloud/dynamodb-entity-store';
import {BOOK_ENTITY} from './book.entity';
import {Book} from './book';
import {AuthorBook} from './authorBook';
import {AUTHOR_BOOK_ENTITY} from './authorBook.entity';

@Injectable()
export class BooksRepository {

    private readonly tableName: string;
    private store: AllEntitiesStore;
    private bookOps: SingleEntityOperations<Book, Pick<Book, 'isbn'>, Pick<Book, 'isbn'>>;
    private authorBookOps: SingleEntityOperations<AuthorBook, Pick<AuthorBook, 'firstName' | 'lastName'>, Pick<AuthorBook, 'isbn'>>;
    private bookPrefix = 'BOOK#';

    constructor() {
        this.tableName = 'online-library';
        const storeContext = createStoreContext({ logger: consoleLogger });

        let tableConfig: TableConfig = createStandardSingleTableConfig(this.tableName);
        tableConfig.metaAttributeNames.entityType = 'TYPE';

        this.store = createStore(tableConfig, storeContext);
        this.bookOps = this.store.for(BOOK_ENTITY);
        this.authorBookOps = this.store.for(AUTHOR_BOOK_ENTITY);
    }

    async getBook(isbn: number) {
        let book: Book;

        try {
            book = await this.bookOps.getOrThrow({isbn});
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

        books = await this.authorBookOps.queryOnePageByPkAndSk({firstName, lastName},
            rangeWhereSkBeginsWith(this.bookPrefix), {scanIndexForward: false});

        // tslint:disable-next-line:no-console
        console.log(books);
        return books;
    }

    async addBook(newBook: Book) {
       await this.bookOps.put(newBook);
       return newBook;
    }
}
