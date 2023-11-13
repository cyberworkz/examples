import {Author} from './author';

export interface Book {

    isbn: number;
    title: string;
    author: Author;
    reserved: boolean;
    edition: number;
    publisher: string;

}
