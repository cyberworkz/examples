import { Injectable } from '@nestjs/common';
import {BooksRepository} from "./books.repository";

@Injectable()
export class BooksService {

    constructor(private bookRepo: BooksRepository) {}

    getBook(isbn: number) {
        return this.bookRepo.getBook(isbn);
    }

    getAuthorBooks(lastName: string, firstName: string) {
        return this.bookRepo.getBooks(lastName, firstName);
    }
}
