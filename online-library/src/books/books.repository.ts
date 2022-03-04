import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DocumentClient } from "aws-sdk/clients/dynamodb"; 
import * as AWS from 'aws-sdk';

@Injectable()
export class BooksRepository {

    private tableName: string;
    private db: DocumentClient;

    private bookPrefix = 'BOOK#';
    private authorPrefix = 'AUTH#'


    constructor() {
        this.tableName = 'online-library';
        this.db = new AWS.DynamoDB.DocumentClient();
    }


    async getBook(isbn: number) {
        console.log('in repo');
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
            console.log(book);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!book) {
            throw new NotFoundException(`Book with ISBN "${isbn}" not found`);
        }

        return book;
    }

    async getBooksByAuthor(lastName: string, firstName: string) {
        return [];
    }
}
