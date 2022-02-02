import {Controller, Get, Param, Res} from '@nestjs/common';
import {BooksService} from "./books.service";
import {IBook} from "./ibook";

@Controller('books')
export class BooksController {

    constructor(private bookService: BooksService){}

    @Get("/:isbn")
    async getBookByISBN(@Param('isbn') isbn:number, @Res() res: any){
        const book: object = await this.bookService.getBook(isbn);
        return book;
    }

    @Get("/author?")
    async getBooksByAuthor(lastName: string, firstName: string, @Res() res: any) {
        const books: IBook[] = await this.bookService.getAuthorBooks(lastName, firstName);
        return books;
    }
}
