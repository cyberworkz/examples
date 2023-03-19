import {IAuthor} from "./iauthor";

export interface IBook {

    isbn: number;
    title: string;
    author: IAuthor;
    category: string;
    reserved: boolean;
    edition: number;
    publisher: string;
    lend: boolean;
    lendDate: Date;
    returnDate: Date;

}
