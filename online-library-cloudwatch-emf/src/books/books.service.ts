import { Injectable } from '@nestjs/common';
import {BooksRepository} from "./books.repository";

@Injectable()
export class BooksService {
    

    constructor(private bookRepo: BooksRepository) {}

    async getBook(isbn: number) {
        return await this.bookRepo.getBook(isbn);
    }

    async getAuthorBooks(lastName: string, firstName: string) {
        return await this.bookRepo.getBooksByAuthor(lastName, firstName);
    }

    async lendBook(isbn: number) {
       return await this.bookRepo.lendBook(isbn);
    }

    async returnBook(isbn: number) {
        return await this.bookRepo.returnBook(isbn);
    }
}
