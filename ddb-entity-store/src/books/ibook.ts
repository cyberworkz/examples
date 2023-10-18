import {IAuthor} from "./iauthor";

export interface IBook {

    isbn: number;
    title: string;
    author: IAuthor;
    reserved: boolean;
    edition: number;
    publisher: string

}
