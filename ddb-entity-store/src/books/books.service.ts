import { Injectable } from '@nestjs/common';
import {BooksRepository} from './books.repository';
import { Book } from './book';

@Injectable()
export class BooksService {

    constructor(private bookRepo: BooksRepository) {}

    async getBook(isbn: number) {
        return await this.bookRepo.getBook(isbn);
    }

    async getAuthorBooks(lastName: string, firstName: string) {
        return await this.bookRepo.getBooksByAuthor(lastName, firstName);
    }

    async addBookToLibrary(newBook: Book) {
        newBook.lend = false;
        return await this.bookRepo.addBook(newBook);
    }
}
