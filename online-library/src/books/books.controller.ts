import { Controller } from '@nestjs/common';
import {BooksService} from "./books.service";

@Controller('books')
export class BooksController {

    constructor(bookService: BooksService){}


    getBookByISBN(isbn:number){

    }

    getBooksByAuthor(authorLastName: string, authorFirstName: string) {

    }
}
