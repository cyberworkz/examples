import {Author} from './author';

export interface Book {
    isbn: number;
    Title: string;
    Author: string;
    category: string;
    lend: boolean;
    lendDate: Date;
    returnDate: Date;
    TYPE: string;
}
