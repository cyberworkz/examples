import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { AllEntitiesStore, Entity, SingleEntityOperations, createStandardSingleTableConfig, createStore } from "@symphoniacloud/dynamodb-entity-store";
import * as AWS from 'aws-sdk';
import { BOOK_ENTITY } from "./book.entity";
import { IBook } from "./ibook";

@Injectable()
export class BooksRepository {

    private tableName: string;
    private db: AllEntitiesStore;
    private bookStore: object
    private bookPrefix = 'BOOK#';
    private authorPrefix = 'AUTH#'


    constructor() {
        this.tableName = 'online-library';
        this.db = createStore(createStandardSingleTableConfig(this.tableName));
        this.bookStore = this.db.for(BOOK_ENTITY);
    }


    async getBook(isbn: number) {
        let book: object;
       
        book = await this.bookStore.getOrThrow
        
        try {
            const result = await this.db
                .get({
                    TableName: this.tableName,
                    Key: { PK: this.bookPrefix.concat(String(isbn)),
                           SK: this.bookPrefix.concat(String(isbn))},
                })
                .promise();

            book = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!book) {
            throw new NotFoundException(`Book with ISBN "${isbn}" not found`);
        }

        return book;
    }

    async getBooksByAuthor(lastName: string, firstName: string) {
        let books = [];

        try {
            const result = await this.db
                .query({
                    TableName: this.tableName,
                    KeyConditionExpression: '#PK=:PK AND begins_with(#SK, :SK)',
                    ExpressionAttributeNames: {
                        '#PK': 'PK',
                        '#SK': 'SK'
                    },
                    ExpressionAttributeValues: {
                        ':PK': this.authorPrefix.concat(lastName.toUpperCase()).concat("_").concat(firstName.toUpperCase()),
                        ':SK': this.bookPrefix
                    },
                    ScanIndexForward: false,
                    Limit: 100
                })
                .promise();
            books = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return books;
    }
}
