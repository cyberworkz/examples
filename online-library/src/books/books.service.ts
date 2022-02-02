import { Injectable } from '@nestjs/common';
import {BooksRepository} from "./books.repository";

@Injectable()
export class BooksService {

    constructor(private bookRepo: BooksRepository) {}

    getBook(isbn: number) {
        return this.bookRepo.getBook(isbn);
    }

    async getAuthorBooks(lastName: string, firstName: string) {
        await this.bookRepo.getBooks(lastName, firstName);
    }
}
