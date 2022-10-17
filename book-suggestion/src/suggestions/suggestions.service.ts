import { Injectable } from '@nestjs/common';
import { IBook } from './ibook';

@Injectable()
export class SuggestionsService {
    getSuggestions(isbn: number): IBook[] {
        const books:IBook[] = [];

        books.push({
            title: 'Harry Potter - The Creature Vault',
            isbn: 123456,
            author: 'Jody Revenson'
        });

        books.push({
            title: 'The Silmarillion',
            isbn: 345216,
            author: 'J.R.R. Tolkien'
        });

        books.push({
            title: 'The Fall of Gondolin',
            isbn: 234516,
            author: 'J.R.R. Tolkien'
        });

        return books;
    }
}
