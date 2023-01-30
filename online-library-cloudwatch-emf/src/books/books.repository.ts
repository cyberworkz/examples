import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWS from 'aws-sdk';

@Injectable()
export class BooksRepository {

    private readonly logger = new Logger(BooksRepository.name);

    private tableName: string;
    private db: DocumentClient;

    private bookPrefix = 'BOOK#';
    private authorPrefix = 'AUTH#';

    constructor() {
        this.tableName = 'online-library';
        this.db = new AWS.DynamoDB.DocumentClient();
    }

    async getBook(isbn: number) {
        let book: object;

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
                        '#SK': 'SK',
                    },
                    ExpressionAttributeValues: {
                        ':PK': this.authorPrefix.concat(lastName.toUpperCase()).concat('_').concat(firstName.toUpperCase()),
                        ':SK': this.bookPrefix,
                    },
                    ScanIndexForward: false,
                    Limit: 100,
                })
                .promise();
            books = result.Items;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return books;
    }

    async lendBook(isbn: number) {
        let result: {};
        try {
            this.logger.log('lending book: ' + isbn);
            result = await this.db
                .update({
                    TableName: this.tableName,
                    Key: {
                        PK: this.bookPrefix.concat(String(isbn)),
                        SK: this.bookPrefix.concat(String(isbn)),
                    },
                    UpdateExpression: 'set #lend = :lendNew, ' +
                        'lendDate = :lendDate',
                    ConditionExpression: '#lend = :lendOpen',
                    ExpressionAttributeNames: {
                        '#lend': 'lend',
                    },
                    ExpressionAttributeValues: {
                        ':lendNew': true,
                        ':lendDate': new Date().toISOString(),
                        ':lendOpen': false,
                    },
                    ReturnValues: 'ALL_NEW',
                })
                .promise();
        } catch (error) {
            this.logger.log(error);
            if (error.code === 'ConditionalCheckFailedException') {
                this.logger.warn('book already lend out: ' + isbn, error);
                return {ok: false, data: 'book already lend out: ' + isbn};
            }
            throw new InternalServerErrorException(error);
        }

        this.logger.log(result);

        // @ts-ignore
        return {ok: true, data: result.Attributes}
    }

    async returnBook(isbn: number) {
        let result: {};
        try {
            this.logger.log('returning book: ' + isbn);
            result = await this.db
                .update({
                    TableName: this.tableName,
                    Key: {
                        PK: this.bookPrefix.concat(String(isbn)),
                        SK: this.bookPrefix.concat(String(isbn)),
                    },
                    UpdateExpression: 'set #lend = :lendNew, ' +
                        'returnDate = :returnDate',
                    ConditionExpression: '#lend = :lendOpen',
                    ExpressionAttributeNames: {
                        '#lend': 'lend',
                    },
                    ExpressionAttributeValues: {
                        ':lendNew': false,
                        ':returnDate': new Date().toISOString(),
                        ':lendOpen': true,
                    },
                    ReturnValues: 'ALL_NEW',
                })
                .promise();
        } catch (error) {
            this.logger.log(error);
            if (error.code === 'ConditionalCheckFailedException') {
                this.logger.warn('book not lend out: ' + isbn, error);
                return {ok: false, data: 'book not lend out: ' + isbn};
            }
            throw new InternalServerErrorException(error);
        }

        this.logger.log(result);

        // @ts-ignore
        return {ok: true, data: result.Attributes}
    }
}
